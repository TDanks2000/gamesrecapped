import { AdminNewConferenceForm } from "@/components/modals/newConference/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NewConferenceDialogContent = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a new conference</DialogTitle>
      </DialogHeader>

      <div>
        <AdminNewConferenceForm />
      </div>
    </DialogContent>
  );
};

export default NewConferenceDialogContent;
