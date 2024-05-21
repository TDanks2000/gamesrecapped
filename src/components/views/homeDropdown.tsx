"use client";

import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, type FC } from "react";

const HomeDropdown: FC = () => {
  const [sortGamesBy, setSortGamesBy] = useState<"date-asc" | "date-desc">();
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const onSelect = useCallback(
    (sortBy: "date-asc" | "date-desc") => {
      const params = new URLSearchParams(search.toString());
      params.set("sortGameBy", sortBy);

      router.push(`${pathname}?${params.toString()}`);
      setSortGamesBy(sortBy);
    },
    [search, router, pathname],
  );

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem
        checked={sortGamesBy === "date-desc" || !sortGamesBy}
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
  );
};

export default HomeDropdown;
