import dayjs from "dayjs";
import duration, { type Duration } from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

dayjs.extend(duration);

interface Options {
  interval?: number;

  dontRun?: boolean;
}

const useCountdown = (date: Date, options?: Options) => {
  const [timeLeft, setTimeLeft] = useState<Duration | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const target = dayjs(date);
      const diff = target.diff(now);

      if (diff <= 0) {
        setTimeLeft(dayjs.duration(0));
      } else {
        setTimeLeft(dayjs.duration(diff));
      }
    };

    calculateTimeLeft(); // initial calculation

    const intervalId = setInterval(() => {
      calculateTimeLeft();
    }, options?.interval ?? 1000); // update every second

    return () => clearInterval(intervalId); // clean up interval on unmount
  }, [date, options?.interval]);

  return timeLeft
    ? {
        days: timeLeft.days(),
        hours: timeLeft.hours(),
        minutes: timeLeft.minutes(),
        seconds: timeLeft.seconds(),
      }
    : null;
};

export default useCountdown;
