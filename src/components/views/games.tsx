"use server";

import { type Game } from "@/@types";
import GameCard from "@/components/cards/game";
import { getGames } from "@/lib/fetchers";
import { type FC } from "react";

interface GamesViewProps {
  searchParams?: {
    sortGameBy?: "date-asc" | "date-desc" | "newest" | "oldest";
    search?: string;
    conference_id?: string;
    [key: string]: string | undefined;
  };
}

const GamesView: FC<GamesViewProps> = async ({ searchParams }) => {
  let games = await getGames(searchParams?.sortGameBy);

  if (searchParams?.search) {
    games = games?.filter((game) => {
      if (!game) return false;
      if (!game.hidden) return false;
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

  if (searchParams?.conference_id) {
    games = games?.filter((game) => {
      if (!game) return false;
      if (!searchParams?.conference_id) return false;
      if (searchParams.conference_id === "all") return true;

      return (
        (game as unknown as Game).conference?.id ===
        Number(searchParams?.conference_id)
      );
    });
  }

  games = games.filter((game) => !game?.hidden);

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
