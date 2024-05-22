import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  check: publicProcedure
    .input(
      z.object({
        password: z.string().or(z.undefined()).or(z.null()),
      }),
    )
    .query(async ({ input }) => {
      if (input.password !== env.ADMIN_PASSWORD) return false;
      return true;
    }),

  login: publicProcedure
    .input(
      z.object({
        username: z.string().or(z.undefined()),
        password: z.string().or(z.undefined()),
      }),
    )
    .query(async ({ input }) => {
      if (input.username !== env.ADMIN_USER) return false;
      if (input.password !== env.ADMIN_PASSWORD) return false;

      return true;
    }),
});
