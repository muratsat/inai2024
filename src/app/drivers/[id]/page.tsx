import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { QrCode, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const averageStars =
    driver.reviews.reduce((prev, b) => prev + b.stars, 0) /
    driver.reviews.length;

  const aiSummary = await api.driver.getAISummary({ id: id });

  return (
    <div className="container flex flex-col items-center justify-center gap-10 px-4 py-16 ">
      <div className="flex flex-row items-center justify-center gap-5">
        <Link href={`/drivers/qr/${id}`}>
          <Button variant={"outline"}>
            <QrCode />
          </Button>
        </Link>
        <h1 className="text-3xl">
          Driver {driver.name}, {driver.licensePlate}
        </h1>
      </div>
      {aiSummary && (
        <div className="max-w-4xl rounded-lg bg-gradient-to-br from-[#dee3ff] to-[#ffcfef] p-5 text-xl">
          <h1 className="text-xl font-extrabold text-violet-900">AI Summary</h1>
          <b> {aiSummary} </b>
        </div>
      )}

      {driver.reviews.length > 0 && (
        <div className="flex flex-row items-center gap-2">
          {Array.from([1, 2, 3, 4, 5]).map((star) => (
            <Star
              key={star}
              size={30}
              fill={star <= averageStars ? "Yellow" : undefined}
            />
          ))}
          <h1 className="text-2xl"> {Math.round(averageStars * 100) / 100} </h1>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {driver.reviews.length > 0 ? (
          <h1 className="text-xl">{driver.name}'s reviews</h1>
        ) : (
          <h1 className="text-xl">{driver.name} doesn't have reviews yet</h1>
        )}
        <Link href={`/drivers/rate/${driver.id}`}>
          <Button> Leave a review</Button>
        </Link>
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
    <div className="flex flex-col rounded-xl bg-white p-6 text-2xl">
      {comment}
      <div className="flex flex-row ">
        {Array.from([1, 2, 3, 4, 5]).map((star) => (
          <Star
            key={star}
            size={30}
            fill={star <= stars ? "Yellow" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
