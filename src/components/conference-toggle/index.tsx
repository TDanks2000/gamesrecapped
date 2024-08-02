"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ConferenceToggle = () => {
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const onSelect = useCallback(
    (open: boolean) => {
      const params = new URLSearchParams(search.toString());
      params.set("conference_open", open.toString());

      router.push(`${pathname}?${params.toString()}`);
      setOpen(open);
    },
    [search, router, pathname],
  );

  useEffect(() => {
    const open = search.get("conference_open") === "true";
    setOpen(open);
  }, [search]);

  return (
    <div className="absolute right-0 top-0 z-10 m-2">
      <Button
        variant={"ghost"}
        className="h-5 w-7 p-0"
        onClick={() => onSelect(!open)}
      >
        <ChevronDown
          className={cn([
            "transition-all",
            {
              "rotate-180": open,
              "rotate-0": !open,
            },
          ])}
        />
      </Button>
    </div>
  );
};

export default ConferenceToggle;
