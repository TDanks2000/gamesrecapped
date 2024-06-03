"use server";

import { api } from "@/trpc/server";
import { PrismaClient, type Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";

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
  data: Prisma.StreamUncheckedUpdateInput,
) => {
  const prisma = new PrismaClient();
  const stream = await prisma.stream.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  return stream;
};

export const isAuth = cache(async () => {
  let token = cookies().get("pwd")?.value ?? null;
  if (!token) return false;

  token = decodeURI(token);

  return await api.admin.check({ password: token });
});
