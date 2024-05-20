import TableGames from "@/components/tables/games";
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

const AdminGamesTab = async () => {
  const total = await api.game.count();
  const offset = 0;
  const limit = 10;

  return (
    <TabsContent value="games">
      <Card x-chunk="admin-chunk-0">
        <CardHeader>
          <CardTitle>Games</CardTitle>
          <CardDescription>Manage the announced games.</CardDescription>
        </CardHeader>

        <CardContent>
          <TableGames />
        </CardContent>

        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {offset + 1}-{offset + limit < total ? offset + limit : total}
            </strong>{" "}
            of <strong>{total}</strong> games
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default AdminGamesTab;
