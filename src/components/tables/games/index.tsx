import TableGamesBody from "@/components/tables/games/body";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";

const TableGames = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Media</span>
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Excusive</TableHead>
          <TableHead className="hidden md:table-cell">Release Date</TableHead>
          <TableHead className="hidden md:table-cell">Developer</TableHead>
          <TableHead className="hidden md:table-cell">Publisher</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <Suspense
        fallback={
          <TableRow>
            <TableCell
              className="h-12 w-full animate-pulse bg-muted/50 p-5"
              colSpan={7}
            >
              Loading
            </TableCell>
          </TableRow>
        }
      >
        <TableGamesBody />
      </Suspense>
    </Table>
  );
};

export default TableGames;
