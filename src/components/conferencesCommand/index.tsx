"use client";
import { type Conference } from "@/@types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { api } from "@/trpc/react";
import { type FC } from "react";

interface ConferencesCommandBoxProps {
  onSelect: (conference: Conference) => void;
}

const ConferencesCommandBox: FC<ConferencesCommandBoxProps> = ({
  onSelect,
}) => {
  const useQueryData = api.conference.all.useQuery({
    sort: "start_time-desc",
  });
  const { data, isPending, error } = useQueryData;

  return (
    <Command>
      <CommandInput placeholder="Search Conferences..." />
      <CommandList>
        <CommandEmpty>No conferences found.</CommandEmpty>
        <CommandGroup heading="Conferences">
          {!isPending ? (
            (data as Conference[])?.map((conference) => (
              <CommandItem
                key={conference.id}
                value={conference.name}
                onSelect={() => onSelect(conference)}
              >
                <p className="max-w-80 truncate text-sm">
                  {conference.id.toString().padStart(2, "0")} -{" "}
                  {conference.name}
                </p>
              </CommandItem>
            ))
          ) : (
            <CommandItem>
              <span>Loading...</span>
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default ConferencesCommandBox;
