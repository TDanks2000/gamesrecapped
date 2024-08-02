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
  async (
    sort?: "date-asc" | "date-desc" | "newest" | "oldest",
    conference_id?: number | "all",
  ) => {
    const data = await api.game.all({
      sort,
      select: [
        GameSelect.conference,
        GameSelect.devloper,
        GameSelect.genres,
        GameSelect.hasMP,
        GameSelect.hasSP,
        GameSelect.id,
        GameSelect.hidden,
        GameSelect.isDLC,
        GameSelect.isExcusive,
        GameSelect.isGameUpdate,
        GameSelect.media,
        GameSelect.publisher,
        GameSelect.release_date,
        GameSelect.title,
      ],
      conference_id,
    });

    return data;
  },
);

export const getStreams = cache(async () => {
  const data = await api.stream.all({});

  return data;
});

export const getConference = cache(
  async (id: number | string, select?: Array<ConferenceSelect>) => {
    if (typeof id === "string") id = parseInt(id);
    const data = await api.conference.get({ id, select });
    return data;
  },
);

export const getStream = cache(async (id: number | string) => {
  if (typeof id === "string") id = parseInt(id);
  const data = await api.stream.get({ id });
  return data;
});

export const getGame = cache(
  async (id: number | string, select?: Array<GameSelect>) => {
    if (typeof id === "string") id = parseInt(id);
    const data = await api.game.get({ id, select });
    return data;
  },
);

export const getMedia = cache(async (id: number | string) => {
  if (typeof id === "string") id = parseInt(id);
  const data = await api.conference.getMedia({ id });
  return data;
});
