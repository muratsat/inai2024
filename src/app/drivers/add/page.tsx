import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { Button } from "@/components/ui/button";
import { AddDriverForm } from "../../_components/add-driver";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <main className="flex  flex-col items-center gap-3 p-5">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-[2rem]">
          You need to sign in to view this page
        </h1>
        <Link href={"/api/auth/signin"}>
          <Button>Sign in</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex  flex-col items-center ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <AddDriverForm />
      </div>
    </main>
  );
}
