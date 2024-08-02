"use server";

import ConfernceCard from "@/components/cards/conference";
import { getConferences } from "@/lib/fetchers";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { type FC, type HTMLAttributes } from "react";
dayjs.extend(isBetween);

interface ConferencesViewProps extends HTMLAttributes<HTMLDivElement> {
  searchParams?: {
    search?: string;
    conference_open?: `${boolean}`;
    [key: string]: string | undefined;
  };
}

const ConferencesView: FC<ConferencesViewProps> = async ({
  className,
  searchParams,
  ...props
}) => {
  let conferences = await getConferences();

  if (!conferences?.length) return null;

  if (searchParams?.search) {
    conferences = conferences?.filter((conference) => {
      if (!conference) return false;
      if (!searchParams?.search) return false;

      return conference.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(searchParams.search.toLowerCase().replace(/\s+/g, ""));
    });
  }

  // put past conferences at the bottom using the start time and end time
  conferences = conferences.sort((a, b) => {
    if (dayjs(new Date()).isAfter(a?.end_time ?? a?.end_time)) return 0;
    if (dayjs(new Date()).isAfter(b?.end_time ?? b?.end_time)) return -1;

    return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
  });

  // conferences = conferences.sort(
  //   (a, b) => {
  //     return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
  //   },
  // );

  return (
    <div
      className={cn([
        "overflow-y-auto transition-all",
        {
          "h-[600px]": searchParams?.conference_open === "true",
          "h-full": searchParams?.conference_open === "true",
          "h-0": searchParams?.conference_open === "false",
        },
      ])}
    >
      <div
        className={cn([
          "flex w-full flex-col gap-3 overflow-hidden",
          className,
        ])}
        {...props}
      >
        {!!conferences?.length ? (
          conferences.map((conference, i) => {
            return (
              <div key={conference.id}>
                <ConfernceCard
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                  {...(conference as any)}
                  isUpNext={i === 0}
                />
              </div>
            );
          })
        ) : (
          <div className="p-2">Nothing to show</div>
        )}
      </div>
    </div>
  );
};

export default ConferencesView;
