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
    ? redirect(vod.link.reFormatLink())
    : !!stream
      ? redirect(stream.link.reFormatLink())
      : redirect("/not-found");

  // return (
  //   <>
  //     <head>
  //       <title>{stream?.title}</title>
  //       <meta name="robots" content="noindex, nofollow" />

  //       <meta name="description" content={stream?.title} />
  //       <meta property="og:title" content={stream?.title} />
  //       <meta property="og:description" content={stream?.title} />

  //       {/* Twitter */}
  //       <meta name="twitter:card" content="summary_large_image" />
  //       <meta name="twitter:title" content={stream?.title} />
  //       <meta
  //         name="twitter:description"
  //         content={`${dayjs(start_time).format("LLL")} - ${dayjs(end_time).format("LLL")}`}
  //       />
  //       <meta name="twitter:image" content={stream?.link} />
  //     </head>
  //   </>
  // );
};

export default RedirectStreamPage;
