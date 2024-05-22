import { api } from "@/trpc/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache, type ComponentType, type FC } from "react";

const isAuth = cache(async (token: string) => {
  const isAuth = await api.admin.check({ password: token });
  return isAuth;
});

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
