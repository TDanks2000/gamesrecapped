"use client";

import { type SortByForGame } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ArrowDownNarrowWide } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, type FC } from "react";

const HomeDropdown: FC = () => {
  const [sortGamesBy, setSortGamesBy] = useState<SortByForGame>("newest");
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const onSelect = useCallback(
    (sortBy: SortByForGame) => {
      const params = new URLSearchParams(search.toString());
      params.set("sortGameBy", sortBy);

      router.push(`${pathname}?${params.toString()}`);
      setSortGamesBy(sortBy);
    },
    [search, router, pathname],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2  ">
          <ArrowDownNarrowWide
            className={cn([
              "size-3.5 transition-all",
              !!(sortGamesBy === "date-asc" || sortGamesBy === "newest") &&
                "rotate-180",
              !!(sortGamesBy === "date-desc" || sortGamesBy === "oldest") &&
                "rotate-0",
            ])}
          />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Sort
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={sortGamesBy === "newest"}
          onSelect={() => onSelect("newest")}
        >
          Newest
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={sortGamesBy === "oldest"}
          onSelect={() => onSelect("oldest")}
        >
          Oldest
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={sortGamesBy === "date-desc"}
          onSelect={() => onSelect("date-desc")}
        >
          Date (newest first)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={sortGamesBy === "date-asc"}
          onSelect={() => onSelect("date-asc")}
        >
          Date (oldest first)
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HomeDropdown;
