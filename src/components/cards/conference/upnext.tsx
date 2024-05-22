"use client";

import { Badge } from "@/components/ui/badge";
import useCountdown from "@/hooks/useCountdown";
import dayjs from "dayjs";
import type { FC } from "react";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface ConferenceUpNextProps {
  date: Date;
}

const ConferenceUpNext: FC<ConferenceUpNextProps> = ({ date }) => {
  const countdown = useCountdown(date);

  return (
    <Badge variant="default">
      {!countdown
        ? "Next Up"
        : `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}
    </Badge>
  );
};

export default ConferenceUpNext;
