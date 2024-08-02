import DefaultLoader from "@/components/loading/default";
import { Separator } from "@/components/ui/separator";
import ConferencesView from "@/components/views/conferences";
import GamesView from "@/components/views/games";
import HomeConferenceSelectDropdown from "@/components/views/homeConferenceSelectDropdown";
import HomeDropdown from "@/components/views/homeDropdown";
import { cn } from "@/lib/utils";

import { Suspense } from "react";

type PageProps = {
  searchParams?: {
    sortGameBy?: "date-asc" | "date-desc";
    search?: string;
    conference_id?: string;
    conference_open?: `${boolean}`;
    [key: string]: string | undefined;
  };
};

export default async function Home({ searchParams }: PageProps) {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-5 px-4 md:flex-row md:px-10">
      <div className="order-2 flex w-full flex-col gap-4 px-4 md:order-1 md:w-full md:px-0">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Games</h1>
          <div className="flex gap-2">
            <Suspense>
              <HomeDropdown />
            </Suspense>

            <Suspense fallback={<DefaultLoader />}>
              <HomeConferenceSelectDropdown />
            </Suspense>

            {/* <Button variant="outline" size="sm" className="h-8 gap-2">
              <FilterIcon className="size-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button> */}
          </div>
        </div>
        <Suspense fallback={<DefaultLoader />}>
          <GamesView searchParams={searchParams} />
        </Suspense>
      </div>

      <div className="relative order-1 flex h-[600px] w-full justify-end md:order-2 md:w-[30%] md:min-w-[420px]">
        <div
          className={cn(
            ["relative flex w-full flex-col gap-2 rounded-lg p-2"],
            {
              "bg-muted/40 ": searchParams?.conference_open === "true",
            },
          )}
        >
          {/* <ConferenceToggle /> */}

          <h1
            className={cn("text-center text-lg font-bold", {
              hidden: searchParams?.conference_open === "false",
            })}
          >
            Conferences
          </h1>

          <Separator className={cn("mb-2", { hidden: searchParams })} />

          <Suspense fallback={<DefaultLoader />}>
            <ConferencesView
              className="w-full pr-3"
              searchParams={searchParams}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
