import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { CalendarIcon } from "lucide-react";
import type { FC } from "react";
dayjs.extend(isBetween);

interface ConfernceCardProps {
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

const ConfernceCard: FC<ConfernceCardProps> = ({
  name,
  end_time,
  start_time,
  id,
  streams,
  isUpNext,
}) => {
  const isLive: boolean = dayjs().isBetween(start_time, end_time);

  // find twitch stream from stream link if not default to first
  const stream =
    streams.find((stream) => stream.link.toLowerCase().includes("twitch")) ??
    streams[0];

  return (
    <a
      className={cn([
        "relative flex w-full flex-col gap-2 rounded-lg bg-muted p-3",
        {
          "ring-1 ring-destructive/40": isLive,
          "group transition-all hover:bg-muted/80": !!stream,
        },
      ])}
      href={!!stream ? stream.link : undefined}
      target="_blank"
      rel="noreferrer"
      key={id}
    >
      <div className="absolute right-1 top-1">
        {isLive && <Badge variant="destructive">LIVE</Badge>}
        {!isLive && isUpNext && <Badge variant="default">Next Up</Badge>}
      </div>

      <div className="flex items-center gap-2">
        <h1 className="truncate text-[13px] font-bold">{name}</h1>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon className="size-5 text-muted-foreground" />
        <h1 className="truncate text-sm">
          {start_time ? dayjs(start_time).format("DD MMM YYYY hh:mm A") : "TBA"}{" "}
          - {end_time ? dayjs(end_time).format("hh:mm A") : "TBA"}{" "}
          <span className="text-xs text-muted-foreground">estimate</span>
        </h1>
      </div>
      {/* TITLE with icon */}
    </a>
  );
};

export default ConfernceCard;
