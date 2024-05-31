import { ConferenceSelect, type Conference } from "@/@types";
import { getConference } from "@/lib/fetchers";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string; title: string };
}

const RedirectStreamPage = async ({ params: { id } }: Props) => {
  const data = await getConference(id, [
    ConferenceSelect.end_time,
    ConferenceSelect.start_time,
    ConferenceSelect.streams,
    ConferenceSelect.id,
  ]);

  if (!data) redirect("/not-found");

  const { end_time, streams } = data as unknown as Conference;
  const hasAired = dayjs().isAfter(end_time);

  // find twitch stream from stream link if not default to first
  const stream =
    streams.find((stream) => stream.link.toLowerCase().includes("twitch")) ??
    streams[0];

  const vod = streams.find((stream) =>
    stream.title?.toLowerCase()?.includes("vod"),
  );

  !!vod && hasAired
    ? redirect(vod.link)
    : !!stream
      ? redirect(stream.link)
      : redirect("/not-found");
};

export default RedirectStreamPage;
