import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

import { PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { type Game } from "@/@types";
import UpdateGaneComponent from "@/components/admin/update/game";
import { Button } from "@/components/ui/button";
import { getImageFromURL } from "@/lib/utils";
import type { FC } from "react";

type TableGamesBodyItemProps = Game;

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
              src={
                media.isImage ? media.link : getImageFromURL(media.link) ?? ""
              }
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
        <UpdateGaneComponent {...game}>
          <Button variant={"ghost"} size={"icon"}>
            <PencilLine className="size-5" />
          </Button>
        </UpdateGaneComponent>

        <Button variant={"ghost"} size={"icon"}>
          <Trash2 className="size-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableGamesBodyItem;
