import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Star } from "lucide-react";

export default async function Home({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  return (
    <main className="flex  flex-col items-center ">
      <Suspense fallback={"Loading..."}>
        <DriverInfo id={id} />
      </Suspense>
    </main>
  );
}

async function DriverInfo({ id }: { id: number }) {
  const driver = await api.driver.getInfo({ id: id });
  if (!driver) notFound();

  return (
    <div className="container flex flex-col items-center justify-center gap-10 px-4 py-16 ">
      <h1 className="text-3xl">
        Driver {driver.name}, {driver.licensePlate}
      </h1>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl">{driver.name}'s reviews</h1>
        {driver.reviews.map((review) => (
          <ReviewCard
            key={review.id}
            stars={review.stars}
            comment={review.comment}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({
  stars,
  comment,
}: {
  stars: number;
  comment: string | null;
}) {
  return (
    <div className="flex flex-col rounded-xl bg-white p-6">
      {comment}
      <div className="flex flex-row ">
        {Array.from([1, 2, 3, 4, 5]).map((star) => (
          <Star
            key={star}
            size={30}
            fill={star < stars ? "Yellow" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
