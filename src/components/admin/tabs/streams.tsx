import { type updateStream } from "@/app/admin/actions";
import TableStreams from "@/components/tables/streams";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { api } from "@/trpc/server";
import { type FC } from "react";

interface AdminStreamsTabProps {
  updateStream: typeof updateStream;
}

const AdminStreamsTab: FC<AdminStreamsTabProps> = async () => {
  const total = await api.stream.count();
  const offset = 0;
  const limit = 10;

  return (
    <TabsContent value="streams">
      <Card x-chunk="admin-chunk-2">
        <CardHeader>
          <CardTitle>Streams</CardTitle>
          <CardDescription>Manage the conference streams.</CardDescription>
        </CardHeader>

        <CardContent>
          <TableStreams />
        </CardContent>

        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {offset + 1}-{offset + limit < total ? offset + limit : total}
            </strong>{" "}
            of <strong>{total}</strong> streams
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default AdminStreamsTab;
