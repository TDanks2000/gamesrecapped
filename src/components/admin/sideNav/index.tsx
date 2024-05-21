import AdminLinkItem from "@/components/admin/sideNav/linkItem";
import {
  CalendarDaysIcon,
  GamepadIcon,
  HomeIcon,
  SquarePlayIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";

const AdminSideNavigation = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-muted/40 sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image
            src={logo}
            alt="Games Recaped Logo"
            width={100}
            height={100}
            className="size-14 object-contain"
          />
          <span className="sr-only">Games Recaped</span>
        </Link>

        <AdminLinkItem title="Home" to="/" icon={<HomeIcon />} />

        <AdminLinkItem
          title="Games"
          to="/admin/new/game"
          icon={<GamepadIcon />}
        />

        <AdminLinkItem
          title="Conferences"
          to="/admin/new/conference"
          icon={<CalendarDaysIcon />}
        />

        <AdminLinkItem
          title="Streams"
          to="/admin/new/stream"
          icon={<SquarePlayIcon />}
        />
      </nav>
    </aside>
  );
};

export default AdminSideNavigation;
