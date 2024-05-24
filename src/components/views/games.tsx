"use server";

import { GameSelect } from "@/@types";
import GameCard from "@/components/cards/game";
import { api } from "@/trpc/server";
import { cache, type FC } from "react";

const getGames = cache(async (sort?: "date-asc" | "date-desc") => {
  const data = await api.game.all({
    select: [
      GameSelect.title,
      GameSelect.conference,
      GameSelect.media,
      GameSelect.isExcusive,
      GameSelect.release_date,
      GameSelect.devloper,
      GameSelect.publisher,
      GameSelect.id,
      GameSelect.isGameUpdate,
      GameSelect.isDLC,
      GameSelect.hasMP,
      GameSelect.hasSP,
      GameSelect.genres,
      GameSelect.isExcusive,
    ],
    sort,
  });

  return data;
});

interface GamesViewProps {
  searchParams?: {
    sortGameBy: "date-asc" | "date-desc";
    [key: string]: string | undefined;
  };
}

const GamesView: FC<GamesViewProps> = async ({ searchParams }) => {
  const games = await getGames(searchParams?.sortGameBy);

  if (!games) return null;

  return (
    <div className="grid w-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-3">
      {games.map((game) => (
        <GameCard
          key={game.id}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
          {...(game as any)}
        />
      ))}
    </div>
  );
};

export default GamesView;
