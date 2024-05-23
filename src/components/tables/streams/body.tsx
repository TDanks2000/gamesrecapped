import TableStreamsBodyItem from "@/components/tables/streams/item";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { api } from "@/trpc/server";
import { cache } from "react";

const getData = cache(async () => {
  const data = await api.stream.all({});

  return data;
});

const TableStreamsBody = async () => {
  const data = await getData();

  return (
    <>
      <TableBody>
        {!!data?.length ? (
          data.map((stream) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <TableStreamsBodyItem key={stream.title} {...(stream as any)} />
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

export default TableStreamsBody;
