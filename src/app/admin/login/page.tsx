"use server";

import Image from "next/image";

import { login } from "@/app/admin/login/actions";
import AdminLogin from "@/components/admin/login";
import { getImageFromURL } from "@/lib/utils";
import { api } from "@/trpc/server";

export default async function AdminLoginPage() {
  const latest = await api.game.latest();

  return (
    <div className="max-h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <AdminLogin login={login} />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={
            getImageFromURL(latest?.media?.[0]?.link) ??
            "https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1RLdppgLllgGZlkjuvHBu6/bcb358556ea6d338346022ef48849675/ac-sh-meta-page-image.jpg"
          }
          alt="Image"
          width="960"
          height="600"
          priority
          draggable={false}
          className="size-full object-cover object-center dark:brightness-[0.3] dark:grayscale"
        />
      </div>
    </div>
  );
}
