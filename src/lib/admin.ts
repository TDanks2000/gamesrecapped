import { api } from "@/trpc/react";

export const isAuthorized = async () => {
  const isAuth = api.admin.check.useQuery();
  const token: string = localStorage.get("pwd") as string;

  if (isAuth) return true;
  return false;
};
