import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type FC, type PropsWithChildren } from "react";

interface UpdateGameProps extends PropsWithChildren {
  id: number;
}

const UpdateGaneComponent: FC<UpdateGameProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Update Game</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateGaneComponent;
