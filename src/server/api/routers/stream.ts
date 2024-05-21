import { z } from "zod";

import { StreamSelect } from "@/@types";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const streamRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        link: z.string(),
        isLiveNow: z.boolean(),
        conferenceId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input: data }) => {
      return ctx.db.stream.create({
        data,
      });
    }),
  all: publicProcedure
    .input(
      z.object({
        select: z.array(z.nativeEnum(StreamSelect).optional()).optional(),
        offset: z.number().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const select: {
        [key in StreamSelect]?: true;
      } = {};

      if (input.select) {
        for (const item of input.select) {
          if (!item) continue;
          select[item] = true;
        }
      }

      const data = ctx.db.stream.findMany({
        select: !Object.values(select).length ? undefined : select,
        skip: input.offset,
        take: input.limit,
      });

      return data;
    }),
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.stream.count();
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
