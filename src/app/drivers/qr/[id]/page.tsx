import { RateDriverForm } from "@/app/_components/rate";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { env } from "@/env";

export default async function Home({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const driver = await api.driver.getById({ id: parseInt(params.id) });
  if (!driver) notFound();

  const reviewPageUrl = `${process.env.VERCEL_URL ?? "http://192.168.88.13:3000"}/drivers/rate/${id}`;

  const qrCodeUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(reviewPageUrl);

  return (
    <main className="flex  flex-col items-center ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-3xl">
          Driver {driver.name}, {driver.licensePlate}
        </h1>
        <Image src={qrCodeUrl} width={200} height={200} alt="qr" />
      </div>
    </main>
  );
}
