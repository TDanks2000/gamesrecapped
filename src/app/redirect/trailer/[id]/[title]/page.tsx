import { getMedia } from "@/lib/fetchers";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string; title: string };
}

const RedirectStreamPage = async ({ params: { id } }: Props) => {
  const data = await getMedia(id);

  if (!data?.link) redirect("/not-found");
  const trailerLink = data?.link.toLowerCase().includes("youtube")
    ? data.link.replace("embed/", "watch?v=")
    : data?.link;

  redirect(trailerLink);
};

export default RedirectStreamPage;
