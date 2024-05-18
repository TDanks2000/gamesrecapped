import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const gameRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(1, "Title must be at least 1 character")
          .max(255, "Title must be less than 255 characters"),
        release_date: z.date().optional(),
        isExcusive: z.boolean(),
        isGameUpdate: z.boolean(),
        isDLC: z.boolean(),
        hasMP: z.boolean(),
        hasSP: z.boolean(),
        genres: z.array(z.string()).optional(),
        devloper: z.array(z.string()).optional(),
        publisher: z.array(z.string()).optional(),
        media: z.object({
          type: z.string(),
          link: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.game.create({
        data: {
          title: input.title,
          release_date: input.release_date,
          genres: input.genres,
          isExcusive: input.isExcusive,
          isGameUpdate: input.isGameUpdate,
          isDLC: input.isDLC,
          hasMP: input.hasMP,
          hasSP: input.hasSP,
          devloper: input.devloper,
          publisher: input.publisher,
          media: {
            create: input.media,
          },
          conference: {},
        },
      });
    }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.game.findMany();
  }),
  search: publicProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.game.findMany({
        where: {
          title: {
            contains: input.title,
          },
        },
      });
    }),
});
