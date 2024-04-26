import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-14 w-full flex-row items-center justify-between border-b px-3 backdrop-blur">
      <Link href="/" className="hidden hover:underline md:block">
        Logo
      </Link>
      <MobileMenu />
      <div className="hidden flex-row gap-2 md:flex ">
        <Link href="#"> One </Link>
        <Link href="#"> Two </Link>
      </div>
    </header>
  );
}

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline">
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <Link href="#"> One </Link>
        <Link href="#"> Two </Link>
      </SheetContent>
    </Sheet>
  );
}
