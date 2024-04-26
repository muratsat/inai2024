import Link from "next/link";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-14 w-full flex-row items-center justify-between border-b px-3 backdrop-blur">
      <MobileMenu />

      <Link href="/" className="hover:underline md:hidden">
        <Bus />
      </Link>
      <div className="hidden flex-row items-center gap-4 md:flex ">
        <Link href="/" className="hidden hover:underline md:block">
          <Bus />
        </Link>
        <Link href="/drivers"> All Drivers</Link>
        {session && <Link href="/drivers/add"> Add drivers </Link>}
      </div>

      <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
        <Button className="rounded-xl">
          {session ? "Sign out" : "Sign in"}
        </Button>
      </Link>
    </header>
  );
}

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignLeft, Bus } from "lucide-react";
import { getServerAuthSession } from "@/server/auth";

export async function MobileMenu() {
  const session = await getServerAuthSession();
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline">
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetClose asChild>
          <Link href="/"> Home </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/drivers"> All Drivers</Link>
        </SheetClose>
        {session && (
          <SheetClose asChild>
            <Link href="/drivers/add"> Add drivers </Link>
          </SheetClose>
        )}
      </SheetContent>
    </Sheet>
  );
}
