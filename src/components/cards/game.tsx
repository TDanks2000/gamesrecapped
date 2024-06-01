import { type Game } from "@/@types";
import GameCardInside from "@/components/cards/game/inside";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { FC } from "react";

type GameCardProps = Game;

const GameCard: FC<GameCardProps> = (game) => {
  const { media: medias, title, id } = game;

  const trailers = medias?.filter((media) => !media?.isImage);

  const hasTrailer = trailers.length > 0;
  const hasMoreThanOneTrailer = trailers.length > 1;

  const redirectLink = (trailerId: number, type: string) =>
    `/redirect/trailer/${trailerId}/${encodeURIComponent(type.toLowerCase())}`;

  if (hasMoreThanOneTrailer)
    return (
      <Popover>
        <PopoverTrigger asChild>
          <GameCardInside {...game} hasTrailer={hasTrailer} />
        </PopoverTrigger>

        <PopoverContent className="w-auto max-w-52 p-0" align="start">
          <div className="flex w-full flex-col gap-1 overflow-hidden bg-opacity-5">
            {trailers.map((trailer) => (
              <a
                key={trailer.id}
                href={redirectLink(trailer.id, title)}
                target="_blank"
                className={buttonVariants({
                  variant: "secondary",
                  size: "sm",
                  className: "w-full rounded-none",
                })}
              >
                <p className="truncate capitalize">{trailer.type}</p>
              </a>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );

  if (!hasTrailer) return <GameCardInside {...game} hasTrailer={hasTrailer} />;
  const trailer = trailers[0]!;

  return (
    <a
      href={redirectLink(trailer.id, title) ?? "#"}
      target="_blank"
      className={cn([
        "relative aspect-video overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm md:max-w-80",
        {
          "group hover:opacity-90": hasTrailer,
        },
      ])}
      key={id}
    >
      <GameCardInside {...game} hasTrailer={hasTrailer} />
    </a>
  );
};

export default GameCard;
