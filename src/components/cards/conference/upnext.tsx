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

  const countdownView = () => {
    if (!countdown) return "Next Up";
    let display;

    const days = countdown.days.toString();
    const hours = countdown.hours.toString();
    const minutes = countdown.minutes.toString();
    const seconds = countdown.seconds.toString();

    if (countdown.days) {
      display = `${days.padStart(2, "0")}d ${hours.padStart(2, "0")}h ${minutes.padStart(2, "0")}m ${seconds.padStart(2, "0")}s`;
    } else if (countdown.hours) {
      display = `${hours.padStart(2, "0")}h ${minutes.padStart(2, "0")}m ${seconds.padStart(2, "0")}s`;
    } else if (countdown.minutes) {
      display = `${minutes.padStart(2, "0")}m ${seconds.padStart(2, "0")}s`;
    } else {
      display = `${seconds.padStart(2, "0")}s`;
    }

    return display;
  };

  return (
    <Badge variant="default" className="text-xs md:text-sm">
      {!countdown ? "Next Up" : countdownView()}
    </Badge>
  );
};

export default ConferenceUpNext;
