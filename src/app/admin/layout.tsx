import AdminSideNavigation from "@/components/admin/sideNav";
import type { FC, PropsWithChildren } from "react";

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <AdminSideNavigation />

      {children}
    </main>
  );
};

export default AdminLayout;
