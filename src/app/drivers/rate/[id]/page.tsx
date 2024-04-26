import { RateDriverForm } from "@/app/_components/rate";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const driver = await api.driver.getById({ id: parseInt(params.id) });
  if (!driver) notFound();

  return (
    <main className="flex  flex-col items-center ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <RateDriverForm id={id} name={driver.name} />
      </div>
    </main>
  );
}
