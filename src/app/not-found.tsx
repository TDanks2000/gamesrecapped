import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function NotFoundPage() {
  return (
    <div className="relative h-[calc(100vh-168px)] w-full">
      <div className="absolute -z-50 size-full overflow-hidden">
        <Image
          src="https://cdn.arstechnica.net/wp-content/uploads/2021/08/Ghost-of-Tsushima-PS4-1.jpg"
          alt="404"
          width={1920}
          height={1080}
          className="absolute z-0 size-full object-cover"
        />
        <div className="absolute z-10 size-full bg-background/80" />

        <div className="absolute z-10 size-full bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 p-2">
        <div className="flex items-center gap-5">
          <Image
            src="/logo-broken.png"
            alt="404"
            width={300}
            height={300}
            className="size-32 object-contain object-center sm:size-52"
            draggable={false}
          />
        </div>

        <div className="mt-5 flex w-full flex-col items-center justify-center gap-2">
          <p className="mb-2 text-3xl font-bold sm:text-4xl">Level Not Found</p>
          <h1 className="text-center text-lg font-medium">
            Oops! It looks like you&#39;ve ventured into uncharted territory.
            <br />
            The page you&#39;re looking for is hidden in a different castle
          </h1>
          <Link
            className={buttonVariants({ variant: "ghost", className: "gap-2" })}
            href="/"
          >
            <ChevronLeft />
            Return to Start
          </Link>
        </div>
      </div>
    </div>
  );
}
