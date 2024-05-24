"use client";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname().toLowerCase();

  if (pathname.includes("/admin")) return null;

  return (
    <div className="mt-5 flex flex-col gap-1 bg-muted/40 p-2 text-center">
      <p className="flex items-center justify-center gap-1 text-sm">
        Made with ❤️ by
        <a
          href="https://github.com/tdanks2000"
          target="_blank"
          className="transition-all hover:underline"
        >
          Tommy
        </a>
      </p>

      <a
        href="https://github.com/tdanks2000/gamesrecaped"
        className="text-m ml-4 text-sm hover:underline"
      >
        Github Repo
      </a>
      <p className="text-sm text-muted-foreground">
        Not affliated with summer games fest, or any other games conference
      </p>
    </div>
  );
};

export default Footer;
