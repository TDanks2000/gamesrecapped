"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, type FC } from "react";

interface ConferenceDropdownSelectProps {
  options: {
    id: number;
    name: string;
    start_time: Date;
    end_time: Date;
  }[];
}

const ConferenceDropdownSelect: FC<ConferenceDropdownSelectProps> = ({
  options,
}) => {
  const [selected, setSelected] = useState<number | "all">("all");
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const onSelect = useCallback(
    (selected: number | "all") => {
      const params = new URLSearchParams(search.toString());
      params.set("conference_id", selected.toString());

      router.push(`${pathname}?${params.toString()}`);
      setSelected(selected);
    },
    [search, router, pathname],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="sm" className="h-8 gap-2  ">
          <CalendarDays className={"size-3.5 transition-all"} />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Conference
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ScrollArea className="h-[220px] overflow-hidden">
          <DropdownMenuCheckboxItem
            checked={selected === "all"}
            onCheckedChange={() => onSelect("all")}
          >
            All
          </DropdownMenuCheckboxItem>
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.id}
              checked={selected === option.id}
              onCheckedChange={() => onSelect(option.id)}
              className="max-w-[300px] capitalize"
            >
              <p className="truncate text-sm">{option.name}</p>
            </DropdownMenuCheckboxItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConferenceDropdownSelect;
