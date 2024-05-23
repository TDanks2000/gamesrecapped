import { ConferenceSelect } from "@/@types";
import TableConferenceBodyItem from "@/components/tables/conference/item";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/server";
import { cache } from "react";

const getData = cache(async () => {
  const data = await api.conference.all({
    select: [
      ConferenceSelect.id,
      ConferenceSelect.end_time,
      ConferenceSelect.name,
      ConferenceSelect.start_time,
    ],
    sort: "start_time-asc",
  });

  return data;
});

const TableConferenceBody = async () => {
  const data = await getData();

  return (
    <>
      <TableBody>
        {!!data?.length ? (
          data.map((conference) => (
            <TableConferenceBodyItem
              key={conference.name}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(conference as any)}
            />
          ))
        ) : (
          <TableRow>
            <TableCell className="h-12 w-full bg-muted/50 p-5" colSpan={7}>
              No data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default TableConferenceBody;
