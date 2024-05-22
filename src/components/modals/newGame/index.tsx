import AdminNewGameForm from "@/components/forms/newGame";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NewGameDialogContent = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a new game</DialogTitle>
      </DialogHeader>

      <div>
        <AdminNewGameForm />
      </div>
    </DialogContent>
  );
};

export default NewGameDialogContent;
