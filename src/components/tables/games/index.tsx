import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TableGames = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Media</span>
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Developer</TableHead>
          <TableHead className="hidden md:table-cell">Publisher</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
};

export default TableGames;
