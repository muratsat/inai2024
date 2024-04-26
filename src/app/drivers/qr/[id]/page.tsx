import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { env } from "@/env";

export default async function Home({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const driver = await api.driver.getById({ id: parseInt(params.id) });
  if (!driver) notFound();

  const baseUrl =
    env.NODE_ENV == "production"
      ? "https://inai2024.vercel.app"
      : "http://192.168.88.13:3000";

  const reviewPageUrl = `${baseUrl}/drivers/rate/${id}`;

  const qrCodeUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
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
