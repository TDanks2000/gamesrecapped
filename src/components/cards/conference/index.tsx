"use client";

import ConferenceUpNext from "@/components/cards/conference/upnext";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { CalendarIcon } from "lucide-react";
import type { FC } from "react";

dayjs.extend(isBetween);

interface ConferenceCardProps {
  id: number;
  name: string;
  start_time: Date;
  end_time: Date;
  streams: {
    id: number;
    title: string;
    link: string;
    isLiveNow: boolean;
  }[];
  isUpNext: boolean;
}

const ConferenceCard: FC<ConferenceCardProps> = ({
  id,
  name,
  start_time,
  end_time,
  streams,
  isUpNext,
}) => {
  const isLive: boolean = dayjs().isBetween(start_time, end_time);
  const hasAired: boolean = dayjs().isAfter(end_time);

  // Find a Twitch stream from the streams list; default to the first stream if not found
  const stream =
    streams.find((stream) => stream.link.toLowerCase().includes("twitch")) ??
    streams[0];

  const redirectLink = `/redirect/stream/${id}/${encodeURIComponent(
    name.toLowerCase(),
  )}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          className={cn([
            "relative flex w-full flex-col gap-2 rounded-lg bg-muted p-3",
            {
              "group transition-all hover:bg-muted/80": !!stream,
            },
          ])}
          href={stream ? redirectLink : undefined}
          target="_blank"
          rel="noreferrer"
        >
          <div className="absolute right-1 top-1 max-w-[30%]">
            {isLive ? (
              <Badge variant="destructive" className="text-xs md:text-sm">
                LIVE
              </Badge>
            ) : isLive ? (
              <ConferenceUpNext date={start_time} />
            ) : hasAired ? (
              <Badge variant="destructive">Aired</Badge>
            ) : null}
          </div>

          <div
            className={cn([
              "flex items-center gap-2 overflow-hidden",
              {
                "max-w-[calc(100%-30%)]": isLive || isUpNext || hasAired,
              },
            ])}
          >
            <h1 className="truncate text-xs font-bold md:text-[13px]">
              {name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4 text-muted-foreground md:size-5" />
            <h1 className="truncate text-xs md:text-sm">
              {start_time
                ? dayjs(start_time).format("DD MMM YYYY hh:mm A")
                : "TBA"}{" "}
              - {end_time ? dayjs(end_time).format("hh:mm A") : "TBA"}{" "}
              <span className="text-xs text-muted-foreground">estimate</span>
            </h1>
          </div>
        </a>
      </TooltipTrigger>
      <TooltipContent
        side="left"
        align="start"
        className="bg-muted px-1.5 py-1"
      >
        <p className="text-sm font-medium">{name}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ConferenceCard;
