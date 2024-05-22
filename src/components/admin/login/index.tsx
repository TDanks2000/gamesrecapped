"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useRef, type FC } from "react";
import { toast } from "sonner";

interface LoginProps {
  login: (
    username: string,
    password: string,
  ) => Promise<
    | {
        redirect: string | null | undefined;
        error: null | string | undefined;
        success: null | boolean | undefined;
      }
    | undefined
  >;
}

const AdminLogin: FC<LoginProps> = ({ login }) => {
  const router = useRouter();

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userNameRef.current || !passwordRef.current) return;
    if (!userNameRef.current.value || !passwordRef.current.value) return;

    const username = userNameRef.current.value;
    const password = passwordRef.current.value;

    if (username.length <= 3 && password.length <= 3) {
      toast.error("Username and password must be at least 4 characters");
      return;
    }

    try {
      const data = await login(username, password);

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      if (data?.redirect && data?.success) {
        toast.success("Login successful");
        router.push(data.redirect);
      }

      toast.success("Login successful");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          min={3}
          placeholder="Username"
          required
          ref={userNameRef}
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input
          id="password"
          ref={passwordRef}
          min={3}
          type="password"
          required
          placeholder="••••••••"
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default AdminLogin;
