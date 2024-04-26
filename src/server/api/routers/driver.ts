import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { driver } from "@/server/db/schema";
import { eq } from "drizzle-orm";

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
      return await ctx.db.query.driver.findFirst({
        where: eq(driver.id, input.id),
      });
    }),
});
