import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { PencilLine, Trash2 } from "lucide-react";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { type Stream } from "@/@types";
import UpdateStreamComponent from "@/components/admin/update/stream";
import { cn } from "@/lib/utils";
import type { FC } from "react";

type TableStreamsBodyItemProps = Stream;

const TableStreamsBodyItem: FC<TableStreamsBodyItemProps> = (stream) => {
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
        <a
          href={stream.link}
          target="_blank"
          rel="noreferrer"
          className="transition-opacity hover:underline hover:opacity-80"
        >
          {stream.link}
        </a>
      </TableCell>
      <TableCell className="hidden capitalize md:table-cell">
        {!stream.conferenceId ? "Unknown" : stream.conferenceId}
      </TableCell>

      <TableCell>
        <UpdateStreamComponent {...stream}>
          <Button variant={"ghost"} size={"icon"}>
            <PencilLine className="size-5" />
          </Button>
        </UpdateStreamComponent>

        <Button variant={"ghost"} size={"icon"}>
          <Trash2 className="size-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableStreamsBodyItem;
