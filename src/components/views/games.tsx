"use server";

import { GameSelect } from "@/@types";
import GameCard from "@/components/cards/game";
import { api } from "@/trpc/server";
import { cache } from "react";

const getGames = cache(async () => {
  const data = await api.game.all({
    select: [
      GameSelect.title,
      GameSelect.conference,
      GameSelect.media,
      GameSelect.isExcusive,
      GameSelect.release_date,
      GameSelect.devloper,
      GameSelect.publisher,
    ],
  });

  return data;
});

const GamesView = async () => {
  const games = await getGames();

  if (!games) return null;

  return (
    <div className="grid grid-cols-3 gap-4 overflow-hidden">
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
