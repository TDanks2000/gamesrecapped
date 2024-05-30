import TableGamesBodyItem from "@/components/tables/games/item";
import { TableBody } from "@/components/ui/table";
import { getGames } from "@/lib/fetchers";

const TableGamesBody = async () => {
  const data = await getGames();

  return (
    <>
      <TableBody>
        {data.map((game) => (
          <TableGamesBodyItem
            media={[]}
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
