"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname().toLowerCase();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src={"/logo.png"}
            alt="Games Recaped Logo"
            width={100}
            height={100}
            className="size-14 object-contain"
          />
          <span className="sr-only">Games Recaped</span>
        </Link>
        <Link
          href="/"
          className={cn([
            "text-muted-foreground transition-colors hover:text-foreground",
            {
              "text-foreground": pathname === "/",
            },
          ])}
        >
          Home
        </Link>
        {/* <Link
          href="/faq"
          className={cn([
            "text-muted-foreground transition-colors hover:text-foreground",
            {
              "text-foreground": pathname === "/faq",
            },
          ])}
        >
          FAQ
        </Link> */}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image
                src={"/logo.png"}
                alt="Games Recaped Logo"
                width={100}
                height={100}
                className="size-12 object-contain"
              />
              <span className="sr-only">Games Recaped</span>
            </Link>
            <Link
              href="/"
              className={cn([
                "text-muted-foreground hover:text-foreground",
                {
                  "text-foreground": pathname === "/",
                },
              ])}
            >
              Home
            </Link>
            {/* <Link
              href="/faq"
              className={cn([
                "text-muted-foreground hover:text-foreground",
                {
                  "text-foreground": pathname === "/faq",
                },
              ])}
            >
              FAQ
            </Link> */}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 mt-[2px] size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Games Or Conferences..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default NavBar;
