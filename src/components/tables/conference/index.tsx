import TableConferenceBody from "@/components/tables/conference/body";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";

const TableConference = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Media</span>
          </TableHead>
          <TableHead className="mr-1 w-[50px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead className="hidden md:table-cell">End Date</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <Suspense
        fallback={
          <TableBody>
            <TableRow>
              <TableCell
                className="h-12 w-full animate-pulse bg-muted/50 p-5"
                colSpan={7}
              >
                Loading
              </TableCell>
            </TableRow>
          </TableBody>
        }
      >
        <TableConferenceBody />
      </Suspense>
    </Table>
  );
};

export default TableConference;
