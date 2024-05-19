import AdminLinkItem from "@/components/admin/sideNav/linkItem";
import {
  CalendarDaysIcon,
  GamepadIcon,
  HomeIcon,
  Package2Icon,
  SquarePlayIcon,
} from "lucide-react";
import Link from "next/link";

const AdminSideNavigation = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-muted/40 sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2Icon className="size-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>

        <AdminLinkItem
          title="Dashboard"
          to="/admin/dashboard"
          icon={<HomeIcon />}
        />

        <AdminLinkItem title="Games" to="/admin/games" icon={<GamepadIcon />} />

        <AdminLinkItem
          title="Conferences"
          to="/admin/conferences"
          icon={<CalendarDaysIcon />}
        />

        <AdminLinkItem
          title="Streams"
          to="/admin/streams"
          icon={<SquarePlayIcon />}
        />
      </nav>
    </aside>
  );
};

export default AdminSideNavigation;
