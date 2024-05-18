import NewConferenceDialogContent from "@/components/modals/newConference";
import NewGameDialogContent from "@/components/modals/newGame";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const AdminNewContent = () => {
  return (
    <div className="flex gap-4">
      <Dialog>
        <DialogTrigger>
          <Button variant={"secondary"}>
            <span>Add a new game</span>
          </Button>
        </DialogTrigger>

        <NewGameDialogContent />
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <Button variant={"secondary"}>
            <span>Add a new conference</span>
          </Button>
        </DialogTrigger>

        <NewConferenceDialogContent />
      </Dialog>

      <Dialog>
        <DialogTrigger>
          <Button variant={"secondary"}>
            <span>Add a new stream</span>
          </Button>
        </DialogTrigger>

        <NewConferenceDialogContent />
      </Dialog>
    </div>
  );
};

export default AdminNewContent;
