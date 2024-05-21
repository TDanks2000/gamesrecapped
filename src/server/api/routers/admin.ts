import { z } from "zod";

import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        password: z.string(),
      }),
    )
    .query(async ({ input }) => {
      if (input.password !== env.ADMIN_PASSWORD) return false;
      return true;
    }),
});
