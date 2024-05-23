"use server";

import { PrismaClient, type Prisma } from "@prisma/client";

export const updateGame = async (id: number, data: Prisma.GameUpdateInput) => {
  const prisma = new PrismaClient();
  const game = await prisma.game.update({
    where: {
      id,
    },
    data,
  });

  return game;
};

export const updateConference = async (
  id: number,
  data: Prisma.ConferenceUpdateInput,
) => {
  const prisma = new PrismaClient();
  const conference = await prisma.conference.update({
    where: {
      id,
    },
    data,
  });

  return conference;
};

export const updateStream = async (
  id: number,
  data: Prisma.StreamUpdateInput,
) => {
  const prisma = new PrismaClient();
  const stream = await prisma.stream.update({
    where: {
      id,
    },
    data,
  });

  return stream;
};
