import { GameSelect } from "@/@types";
import TableGamesBodyItem from "@/components/tables/games/item";
import { TableBody } from "@/components/ui/table";
import { api } from "@/trpc/server";
import { cache } from "react";

const getData = cache(async () => {
  const data = await api.game.all({
    select: [
      GameSelect.id,
      GameSelect.title,
      GameSelect.media,
      GameSelect.isExcusive,
      GameSelect.release_date,
      GameSelect.devloper,
      GameSelect.publisher,
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
            id={game.id}
            title={game.title}
            isExcusive={game.isExcusive}
            release_date={game.release_date}
            devloper={game.devloper}
            publisher={game.publisher}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            media={(game as any).media}
          />
        ))}
      </TableBody>
    </>
  );
};

export default TableGamesBody;
