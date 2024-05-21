import { Separator } from "@/components/ui/separator";
import ConferencesView from "@/components/views/conferences";
import GamesView from "@/components/views/games";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-row gap-4 p-5 px-10">
      <div className="flex w-2/3 flex-col gap-3">
        <h1 className="text-2xl font-bold">Games</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <GamesView />
        </Suspense>
      </div>
      <div className="sticky flex h-[600px] w-1/3 justify-end">
        <div className="flex w-full flex-col gap-2 rounded-lg bg-muted/40 p-2">
          <h1 className="text-center text-lg font-bold">Conferences</h1>
          <Separator className="mb-2" />
          <Suspense fallback={<div>Loading...</div>}>
            <ConferencesView className="pr-3" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
