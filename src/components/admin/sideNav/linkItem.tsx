import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import type { FC } from "react";

interface AdminLinkItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
}

const AdminLinkItem: FC<AdminLinkItemProps> = ({ title, to, icon }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={to}
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
        >
          <div className="*[&>svg]:size-5">{icon}</div>
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
};

export default AdminLinkItem;
