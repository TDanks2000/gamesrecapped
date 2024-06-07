import { type Game } from "@/@types";
import { Badge } from "@/components/ui/badge";
import { cn, getImageFromURL } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { type FC } from "react";

const GameCardInside: FC<
  Game & {
    hasTrailer: boolean;
  }
> = ({
  conference,
  isDLC,
  isGameUpdate,
  hasTrailer,
  isExcusive,
  hasMP,
  hasSP,
  media: medias,
  title,
  release_date,
}) => {
  const media = medias?.find((media) => media.isImage) ?? medias?.[0];

  const image = !media
    ? ""
    : media.isImage
      ? media.link
      : getImageFromURL(media.link);

  return (
    <div
      className={cn([
        "relative aspect-video overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm md:max-w-80",
        {
          "group hover:opacity-90": hasTrailer,
        },
      ])}
    >
      {/* BG */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          className="size-full object-cover transition-all ease-linear group-hover:-rotate-1 group-hover:scale-[1.01]"
          src={image ?? ""}
          alt="Game"
          width={150}
          height={150}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background to-transparent opacity-95" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex size-full w-full flex-col justify-between">
        <div className="flex justify-between px-3 py-2">
          <div className="absolute right-0 top-0 p-1">
            <Badge variant={"secondary"}>
              <p className="truncate">
                {isGameUpdate
                  ? "Game Update"
                  : isDLC
                    ? "DLC"
                    : isExcusive
                      ? "Excusive"
                      : hasMP && hasSP
                        ? "SP/MP"
                        : hasMP
                          ? "Multiplayer"
                          : "Singleplayer"}
              </p>
            </Badge>
          </div>
        </div>
        <div className="flex size-full flex-1 flex-col items-start justify-end gap-0.5 p-3">
          <Badge variant={"secondary"} className="max-w-full">
            <p className="truncate text-[10px]">{conference?.name}</p>
          </Badge>
          <h3 className="line-clamp-2 text-sm font-semibold">{title}</h3>
          {/* RELEASE DATE */}
          <p className="truncate text-xs text-muted-foreground">
            {release_date
              ? dayjs(release_date).locale("en").format("MMMM DD, YYYY")
              : "TBA"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameCardInside;
