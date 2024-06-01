"use client";

import { cn } from "@/lib/utils";
import {
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

interface GameCardLinkProps extends PropsWithChildren {
  link: string;
  hasTrailer?: boolean;
  id: number;
  open: boolean;
  className?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const GameCardLink: FC<GameCardLinkProps> = ({
  link,
  children,
  hasTrailer,
  open,
  setOpen,
  className,
  id,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      className={
        className ??
        cn([
          "relative aspect-video overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm md:max-w-80",
          {
            "group hover:opacity-90": hasTrailer,
          },
        ])
      }
      key={id}
      onClick={() => setOpen(!open)}
    >
      {children}
    </a>
  );
};

export default GameCardLink;
