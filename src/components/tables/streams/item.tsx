import { Badge } from "@/components/ui/badge";
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

import { cn } from "@/lib/utils";
import type { FC } from "react";

interface TableGamesBodyItemProps {
  id: number;
  title: string;
  link: string;
  isLiveNow: boolean;
  conferenceId: number | null;
}

const TableStreamsBodyItem: FC<TableGamesBodyItemProps> = (stream) => {
  return (
    <TableRow key={stream.title}>
      <TableCell className="hidden aspect-square sm:table-cell"></TableCell>
      <TableCell className="font-medium">{stream.title}</TableCell>
      <TableCell>
        <Badge
          variant={!!stream.isLiveNow ? "destructive" : "default"}
          className={cn([
            {
              "text-white": !!stream.isLiveNow,
              "border-green-400": !!stream.isLiveNow,
            },
          ])}
        >
          {!!stream.isLiveNow ? "Live" : "Not Live"}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {!stream.link ? "Unknown" : stream.link}
      </TableCell>
      <TableCell className="hidden capitalize md:table-cell">
        {!stream.conferenceId ? "Unknown" : stream.conferenceId}
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

export default TableStreamsBodyItem;
