import TableConferenceBodyItem from "@/components/tables/conference/item";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getConferences } from "@/lib/fetchers";

const TableConferenceBody = async () => {
  const data = await getConferences();

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
