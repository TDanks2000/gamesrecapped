import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const streamRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        link: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.stream.create({
        data: {
          title: input.title,
          link: input.link,
        },
      });
    }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.stream.findMany();
  }),
  search: publicProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.stream.findMany({
        where: {
          title: {
            contains: input.title,
          },
        },
      });
    }),
});
