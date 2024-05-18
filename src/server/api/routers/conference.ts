import { z } from "zod";

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
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.conference.findMany();
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
