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
import Image from "next/image";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { getImageFromURL } from "@/lib/utils";
import type { FC } from "react";

interface TableGamesBodyItemProps {
  title: string;
  isExcusive: boolean;
  release_date: Date | null;
  devloper: string[];
  publisher: string[];
  media: {
    id: number;
    type: string;
    link: string;
    isImage: boolean;
    game_id: number | null;
  }[];
}

const TableGamesBodyItem: FC<TableGamesBodyItemProps> = (game) => {
  const media = game.media?.[0];

  return (
    <TableRow key={game.title}>
      <TableCell className="hidden aspect-square sm:table-cell">
        {!media ? (
          "Unknown"
        ) : (
          <div className="relative aspect-square">
            <Image
              src={media.isImage ? media.link : getImageFromURL(media.link)}
              alt={game.title}
              width={150}
              height={150}
              className="aspect-square size-full rounded-md object-cover"
            />
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{game.title}</TableCell>
      <TableCell>
        <Badge variant="outline">
          {game.isExcusive ? "Excusive" : "Non-Excusive"}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {!game.release_date
          ? "Unknown"
          : dayjs(game.release_date).format("LLLL")}
      </TableCell>
      <TableCell className="hidden capitalize md:table-cell">
        {!game.devloper?.length ? "Unknown" : game.devloper.join(", ")}
      </TableCell>

      <TableCell className="hidden capitalize md:table-cell">
        {!game.publisher?.length ? "Unknown" : game.publisher.join(", ")}
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

export default TableGamesBodyItem;
