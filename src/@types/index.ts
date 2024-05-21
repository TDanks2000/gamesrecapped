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
