import { isAuth } from "@/lib/fetchers";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type ComponentType, type FC } from "react";

const withAdmin = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper: FC<P> = async (props) => {
    let token = cookies().get("pwd")?.value ?? "";
    token = decodeURI(token);

    const ISAuth = await isAuth(token);

    if (!ISAuth) {
      redirect("/admin/login");
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAdmin;
