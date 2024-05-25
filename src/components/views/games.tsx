"use server";

import { GameSelect, type Game } from "@/@types";
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
    sortGameBy?: "date-asc" | "date-desc";
    search?: string;
    [key: string]: string | undefined;
  };
}

const GamesView: FC<GamesViewProps> = async ({ searchParams }) => {
  let games = await getGames(searchParams?.sortGameBy);

  if (searchParams?.search) {
    games = games?.filter((game) => {
      if (!game) return false;
      if (!searchParams?.search) return false;

      return (
        game.title
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchParams.search.toLowerCase().replace(/\s+/g, "")) ||
        (game as unknown as Game).conference?.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchParams.search.toLowerCase().replace(/\s+/g, ""))
      );
    });
  }

  if (!games) return null;

  return (
    <div className="grid w-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-3 lg:grid-cols-4">
      {!!games?.length ? (
        games.map((game) => (
          <GameCard
            key={game.id}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            {...(game as any)}
          />
        ))
      ) : (
        <p>Nothing to show</p>
      )}
    </div>
  );
};

export default GamesView;
