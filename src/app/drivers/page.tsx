import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

export default async function Home() {
  return (
    <main className="flex  flex-col items-center ">
      <Suspense fallback={"Loading..."}>
        <DriversList />
      </Suspense>
    </main>
  );
}

async function DriversList() {
  const drivers = await api.driver.getAll();
  if (!drivers) notFound();

  return (
    <div className="container flex max-w-5xl flex-col justify-center gap-10 px-4 py-16">
      {drivers.map((driver) => (
        <div key={driver.id} className="flex flex-row items-center gap-5">
          <Link href={`/drivers/qr/${driver.id}`}>
            <Button variant={"outline"}>
              <QrCode />
            </Button>
          </Link>
          <Link href={`/drivers/${driver.id}`}>
            <u className="text-3xl hover:text-blue-900">
              Driver {driver.name}, {driver.licensePlate}
            </u>
          </Link>
        </div>
      ))}
    </div>
  );
}
