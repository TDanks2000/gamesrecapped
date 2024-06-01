"use client";

import { usePathname } from "next/navigation";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { SiKofi } from "react-icons/si";

const Footer = () => {
  const pathname = usePathname().toLowerCase();

  if (pathname.includes("/admin")) return null;

  return (
    <div className="mt-5 flex flex-col  items-center justify-between gap-5 bg-muted/40 p-5 px-14 text-center sm:flex-row sm:gap-1 sm:text-left">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} Games Recaped
        </p>
        <p className="text-sm text-muted-foreground">
          Not affliated with summer games fest, or any other games conference
        </p>
      </div>

      <div className="flex flex-row gap-3">
        <a
          className="size-5 transition-all hover:opacity-50"
          target="_blank"
          href="https://github.com/tdanks2000/gamesrecaped"
        >
          <FaGithub className="size-full" />
        </a>

        <a
          href="https://x.com/gamesrecapped"
          target="_blank"
          className="size-5 transition-all hover:opacity-50"
        >
          <FaXTwitter className="size-full" />
        </a>

        <a
          href="https://ko-fi.com/tdanks2000"
          target="_blank"
          className="size-5 transition-all hover:opacity-50"
        >
          <SiKofi className="size-full" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
