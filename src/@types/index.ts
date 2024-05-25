export enum GameSelect {
  id = "id",
  title = "title",
  release_date = "release_date",
  genres = "genres",
  isExcusive = "isExcusive",
  isGameUpdate = "isGameUpdate",
  isDLC = "isDLC",
  hasMP = "hasMP",
  hasSP = "hasSP",
  devloper = "devloper",
  publisher = "publisher",
  media = "media",
  conference = "conference",
}

export enum ConferenceSelect {
  id = "id",
  name = "name",
  start_time = "start_time",
  end_time = "end_time",
  games = "games",
  streams = "streams",
}

export enum StreamSelect {
  id = "id",
  title = "title",
  link = "link",
  isLiveNow = "isLiveNow",
  Conference = "Conference",
  conferenceId = "conferenceId",
}

export interface Game {
  id: number;
  title: string;
  release_date: Date | null;
  genres: string[];
  isExcusive: boolean;
  isGameUpdate: boolean;
  isDLC: boolean;
  hasMP: boolean;
  hasSP: boolean;
  devloper: string[];
  publisher: string[];
  media: Media[];
  conference: Conference | null;
}

export interface Conference {
  id: number;
  name: string;
  start_time: Date;
  end_time: Date;
  games: Game[];
  streams: Stream[];
}

export interface Stream {
  id: number;
  title: string;
  link: string;
  isLiveNow: boolean;
  Conference: Conference | null;
  conferenceId: number | null;
}

export interface Media {
  id: number;
  type: string;
  link: string;
  isImage: boolean;
}

export type SortByForGame = "date-desc" | "date-asc" | "newest" | "oldest";
