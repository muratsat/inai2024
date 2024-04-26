import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { driver, review } from "@/server/db/schema";
import { asc, eq } from "drizzle-orm";
import { OpenAiSummary } from "@/lib/openai";

export const driverRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string().min(1), licensePlate: z.string().min(1) }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(driver)
        .values({ name: input.name, licensePlate: input.licensePlate });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      console.log("Searching for driver ", input.id);
      return ctx.db.query.driver.findFirst({
        where: eq(driver.id, input.id),
      });
    }),

  getInfo: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      console.log("Searching for driver ", input.id);
      return ctx.db.query.driver.findFirst({
        where: eq(driver.id, input.id),
        with: {
          reviews: true,
        },
      });
    }),

  getAISummary: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.db.query.review.findMany({
        where: eq(review.driverId, input.id),
        columns: { comment: true },
      });

      const packed = reviews
        .filter((x) => x !== null)
        .map((x) => x.comment)
        .join("; ");

      const summary = await OpenAiSummary(packed);
      return summary;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.driver.findMany({
      orderBy: asc(driver.id),
    });
  }),

  addReview: publicProcedure
    .input(
      z.object({
        driverId: z.number(),
        comment: z.string().max(255),
        stars: z.number().min(1).max(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const targetDriver = await ctx.db.query.driver.findFirst({
        where: eq(driver.id, input.driverId),
      });
      if (targetDriver) {
        console.log(
          `Received review ${input.driverId}, ${input.comment}, ${input.stars} stars`,
        );
        return ctx.db.insert(review).values({
          driverId: input.driverId,
          stars: input.stars,
          comment: input.comment,
        });
      }
    }),
});
