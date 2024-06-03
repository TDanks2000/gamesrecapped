import { isAuth } from "@/app/admin/actions";
import NormalLink from "@/components/navBar/items/link/normal";
import { useEffect, useState } from "react";

const AdminLink = ({ pathname }: { pathname: string }) => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    void isAuth().then((data) => setAdmin(data));
  }, []);

  return admin ? (
    <NormalLink href="/admin" title="Admin" pathname={pathname} />
  ) : null;
};

export default AdminLink;
