import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";

import { MoreHorizontal } from "lucide-react";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import type { FC } from "react";

interface TableGamesBodyItemProps {
  id: number;
  name: string;
  start_date: Date | null;
  end_date: Date | null;
}

const TableConferenceBodyItem: FC<TableGamesBodyItemProps> = (conference) => {
  return (
    <TableRow key={conference.name}>
      <TableCell className="hidden aspect-square sm:table-cell"></TableCell>
      <TableCell className="text-center font-medium">{conference.id}</TableCell>
      <TableCell className="font-medium">{conference.name}</TableCell>
      <TableCell>
        {!conference.start_date
          ? "Unknown"
          : dayjs(conference.start_date).format("LLLL")}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {!conference.end_date
          ? "Unknown"
          : dayjs(conference.end_date).format("LLLL")}
      </TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default TableConferenceBodyItem;
