import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

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
        <Link
          key={driver.id}
          href={`/drivers/${driver.id}`}
          className="text-2xl font-semibold text-blue-900"
        >
          {driver.name}, {driver.licensePlate}
        </Link>
      ))}
    </div>
  );
}
