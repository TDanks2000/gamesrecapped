import { type updateConference } from "@/app/admin/actions";
import TableConference from "@/components/tables/conference";
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

interface AdminConferenceTabProps {
  updateConference: typeof updateConference;
}

const AdminConferenceTab: FC<AdminConferenceTabProps> = async () => {
  const total = await api.conference.count();
  const offset = 0;
  const limit = 10;

  return (
    <TabsContent value="conferences">
      <Card x-chunk="admin-chunk-1">
        <CardHeader>
          <CardTitle>Conferences</CardTitle>
          <CardDescription>Manage the announced conferences.</CardDescription>
        </CardHeader>

        <CardContent>
          <TableConference />
        </CardContent>

        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {offset + 1}-{offset + limit < total ? offset + limit : total}
            </strong>{" "}
            of <strong>{total}</strong> conferences
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default AdminConferenceTab;
