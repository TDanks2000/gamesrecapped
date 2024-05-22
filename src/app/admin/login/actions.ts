"use server";

import { api } from "@/trpc/server";
import { cookies } from "next/headers";

export const login = async (username: string, password: string) => {
  // cookies().delete("pwd");
  const check = await api.admin.login({ username, password });

  if (check) {
    cookies().set("pwd", password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // One week
      path: "/",
    });

    return {
      redirect: "/admin",
      error: null,
      success: true,
    };
  }

  if (!check)
    return {
      redirect: null,
      success: false,
      error: "Incorrect username or password",
    };
};
