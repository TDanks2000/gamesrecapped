import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { PencilLine, Trash2 } from "lucide-react";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

import { type Conference } from "@/@types";
import UpdateConferenceComponent from "@/components/admin/update/conference";
import type { FC } from "react";

type TableConferenceBodyItem = Conference;

const TableConferenceBodyItem: FC<TableConferenceBodyItem> = (conference) => {
  return (
    <TableRow key={conference.name}>
      <TableCell className="hidden aspect-square sm:table-cell"></TableCell>
      <TableCell className="text-center font-medium">{conference.id}</TableCell>
      <TableCell className="font-medium">{conference.name}</TableCell>
      <TableCell>
        {!conference.start_time
          ? "Unknown"
          : dayjs(conference.start_time).format("LLLL")}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {!conference.end_time
          ? "Unknown"
          : dayjs(conference.end_time).format("LLLL")}
      </TableCell>

      <TableCell>
        <UpdateConferenceComponent {...conference}>
          <Button variant={"ghost"} size={"icon"}>
            <PencilLine className="size-5" />
          </Button>
        </UpdateConferenceComponent>

        <Button variant={"ghost"} size={"icon"}>
          <Trash2 className="size-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TableConferenceBodyItem;
