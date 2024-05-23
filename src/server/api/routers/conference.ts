import { z } from "zod";

import { ConferenceSelect } from "@/@types";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const conferenceRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        start_time: z.date(),
        end_time: z.date(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.conference.create({
        data: {
          start_time: input.start_time,
          end_time: input.end_time,
          name: input.name,
        },
      });
    }),
  all: publicProcedure
    .input(
      z.object({
        select: z.array(z.nativeEnum(ConferenceSelect).optional()).optional(),
        offset: z.number().optional(),
        limit: z.number().optional(),
        sort: z.enum(["start_time-asc", "start_time-desc"]).optional(),
        filter: z.enum(["live", "upcoming", "past"]).optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const select: {
        [key in ConferenceSelect]?: true;
      } = {};

      if (input.select) {
        for (const item of input.select) {
          if (!item) continue;
          select[item] = true;
        }
      }

      const data = ctx.db.conference.findMany({
        select: !Object.values(select).length ? undefined : select,
        skip: input.offset,
        take: input.limit,
        orderBy: {
          start_time: input.sort === "start_time-asc" ? "asc" : "desc",
        },
        where: {
          start_time:
            input.filter === "upcoming" ? { gt: new Date() } : undefined,
          end_time: input.filter === "past" ? { lt: new Date() } : undefined,
        },
      });

      return data;
    }),
  count: publicProcedure.query(({ ctx }) => {
    return ctx.db.conference.count();
  }),
  search: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.conference.findMany({
        where: {
          name: {
            contains: input.name,
          },
        },
      });
    }),
});
