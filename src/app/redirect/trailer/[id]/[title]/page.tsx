import { GameSelect, type Game } from "@/@types";
import { getGame } from "@/lib/fetchers";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string; title: string };
}

const RedirectStreamPage = async ({ params: { id } }: Props) => {
  const data = await getGame(id, [GameSelect.conference, GameSelect.media]);

  const { media: medias } = data as unknown as Game;

  const media = medias?.find((media) => media.isImage) ?? medias?.[0];

  if (!media) redirect("/not-found");

  const trailers = medias?.filter((media) => !media?.isImage);

  const trailer = trailers[0];

  const trailerLink = trailer?.link.toLowerCase().includes("youtube")
    ? trailer.link.replace("embed/", "watch?v=")
    : trailer?.link;

  if (!trailerLink) redirect("/not-found");
  redirect(trailerLink);
};

export default RedirectStreamPage;
