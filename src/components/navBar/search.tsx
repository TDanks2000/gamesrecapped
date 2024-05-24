"use client";

import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils/debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, type ChangeEvent } from "react";

const NavBarSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", search);
      router.push(`${pathname}?${params.toString()}`);
    }, 300),
    [router, pathname, searchParams],
  );

  return (
    <div className="ml-auto flex-1 sm:flex-initial">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 mt-[2px] size-4 text-muted-foreground" />
        <Input
          defaultValue={searchParams.get("search") ?? ""}
          onChange={handleSearch}
          type="search"
          placeholder="Search Games Or Conferences..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        />
      </div>
    </div>
  );
};

export default NavBarSearch;
