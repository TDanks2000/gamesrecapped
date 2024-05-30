import { ConferenceSelect, GameSelect } from "@/@types";
import { api } from "@/trpc/server";
import { cache } from "react";

export const isAuth = cache(async (token: string) => {
  const isAuth = await api.admin.check({ password: token });
  return isAuth;
});

export const getConferences = cache(
  async (sort?: "start_time-asc" | "start_time-desc") => {
    const data = await api.conference.all({
      sort,
      select: [
        ConferenceSelect.end_time,
        ConferenceSelect.games,
        ConferenceSelect.id,
        ConferenceSelect.name,
        ConferenceSelect.start_time,
        ConferenceSelect.streams,
      ],
    });

    return data;
  },
);

export const getGames = cache(
  async (sort?: "date-asc" | "date-desc" | "newest" | "oldest") => {
    const data = await api.game.all({
      sort,
      select: [
        GameSelect.conference,
        GameSelect.devloper,
        GameSelect.genres,
        GameSelect.hasMP,
        GameSelect.hasSP,
        GameSelect.id,
        GameSelect.isDLC,
        GameSelect.isExcusive,
        GameSelect.isGameUpdate,
        GameSelect.media,
        GameSelect.publisher,
        GameSelect.release_date,
        GameSelect.title,
      ],
    });

    return data;
  },
);

export const getStreams = cache(async () => {
  const data = await api.stream.all({});

  return data;
});

export const getConference = cache(async (id: number) => {
  const data = await api.conference.get({ id });
  return data;
});
