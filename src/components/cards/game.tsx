import { Badge } from "@/components/ui/badge";
import { cn, getImageFromURL } from "@/lib/utils";
import dayjs from "dayjs";
import { default as Image } from "next/image";
import type { FC } from "react";

interface GameCardProps {
  media: {
    id: number;
    type: string;
    link: string;
    isImage: boolean;
  }[];
  conference?: {
    name: string;
    start_date: Date | null;
    end_date: Date | null;
  };
  id: number;
  title: string;
  release_date: Date | null;
  genres: string[];
  isExcusive: boolean;
  isGameUpdate: boolean;
  isDLC: boolean;
  hasMP: boolean;
  hasSP: boolean;
  devloper: string[];
  publisher: string[];
  conference_id: number | null;
  createdAt: Date;
  updatedAt: Date;
}

const GameCard: FC<GameCardProps> = ({
  media: medias,
  title,
  conference,
  isDLC,
  isGameUpdate,
  isExcusive,
  hasMP,
  hasSP,
  id,
  release_date,
}) => {
  const media = medias?.find((media) => media.isImage) ?? medias?.[0];

  const image = !media
    ? ""
    : media.isImage
      ? media.link
      : getImageFromURL(media.link);

  const trailers = medias?.filter((media) => !media?.isImage);

  const hasTrailer = trailers.length > 0;
  const trailer = trailers[0];

  const trailerLink = trailer?.link.toLowerCase().includes("youtube")
    ? trailer.link.replace("embed/", "watch?v=")
    : trailer?.link;

  return (
    <a
      href={trailerLink ?? "#"}
      target="_blank"
      rel="noreferrer"
      className={cn([
        "relative aspect-video overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm md:max-w-80",
        {
          "group hover:opacity-90": hasTrailer,
        },
      ])}
      key={id}
    >
      {/* BG */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          className="size-full object-cover transition-all ease-linear group-hover:-rotate-1 group-hover:scale-[1.01]"
          src={image ?? ""}
          alt="Game"
          width={300}
          height={300}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background to-transparent opacity-95" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex size-full flex-col justify-between">
        <div className="flex justify-between px-3 py-2">
          <div></div>
          <div>
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
        <div className="flex flex-col items-start gap-0.5 p-4 py-5">
          <Badge variant={"secondary"} className="max-w-full">
            <p className="truncate text-[10px]">{conference?.name}</p>
          </Badge>
          <h3 className="line-clamp-2 text-sm font-semibold">{title}</h3>
          {/* RELEASE DATE */}
          <p className="truncate text-xs text-muted-foreground">
            {release_date ? dayjs(release_date).format("MMMM DD, YYYY") : "TBA"}
          </p>
        </div>
      </div>
    </a>
  );
};

export default GameCard;
