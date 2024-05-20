import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/server";
import { cache } from "react";

const getData = cache(async () => {
  const data = await api.conference.all({});

  return data;
});

const TableConferenceBody = async () => {
  const data = await getData();

  return (
    <>
      <TableBody>
        {!!data?.length ? (
          data.map((conference) => (
            <TableConferenceBody key={conference.name} {...conference} />
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
