import { GameSelect } from "@/@types";
import TableGamesBodyItem from "@/components/tables/games/item";
import { TableBody } from "@/components/ui/table";
import { api } from "@/trpc/server";
import { cache } from "react";

const getData = cache(async () => {
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
  });

  return data;
});

const TableGamesBody = async () => {
  const data = await getData();

  return (
    <>
      <TableBody>
        {data.map((game) => (
          <TableGamesBodyItem
            key={game.title}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(game as any)}
          />
        ))}
      </TableBody>
    </>
  );
};

export default TableGamesBody;
