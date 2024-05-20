import TableStreamsBody from "@/components/tables/streams/body";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";

const TableStreams = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Media</span>
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>isLiveNow</TableHead>
          <TableHead className="hidden md:table-cell">link</TableHead>
          <TableHead className="hidden md:table-cell">conference_id</TableHead>
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
        <TableStreamsBody />
      </Suspense>
    </Table>
  );
};

export default TableStreams;
