import { api } from "@/trpc/server";
import { ImageResponse } from "@vercel/og";
import dayjs from "dayjs";

import advanced from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advanced);

import { type NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const conferenceId = searchParams.get("id");
  if (!conferenceId) {
    return new Response("No conference id", { status: 400 });
  }

  const conference = await api.conference.get({
    id: parseInt(conferenceId),
  });

  if (!conference) {
    return new Response("Conference not found", { status: 404 });
  }

  const color = "#7d5fff";

  const titleLength = 80;

  const cover =
    "https://blog.playstation.com/tachyon/2024/04/4cac0ab5e97f4a2dd352919089793c07e88a429b.jpg?resize=1088%2C612&crop_strategy=smart&zoom=1.5";

  const start_time = conference.start_time;
  const end_time = conference.end_time;

  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 1200,
              height: 328,
              backgroundColor: "white",
              zIndex: 0,
              display: "flex",
            }}
          >
            <img
              src={cover}
              width={1200}
              height={628}
              alt="cover"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                width: "100%",
                height: "100%",
                backgroundColor: color,
                opacity: 0.6,
              }}
            ></div>
          </div>

          <div
            style={{
              position: "absolute",
              zIndex: 2,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              gap: -20,
            }}
          >
            <h1
              style={{
                fontSize: 40,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                color: "white",
                textAlign: "center",
              }}
            >
              {conference.name}
            </h1>

            <p
              style={{
                fontSize: 35,
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "-0.015em",
                color: "white",
                textAlign: "center",
              }}
            >
              {start_time
                ? dayjs(start_time).format("DD MMM YYYY hh:mm A")
                : "TBA"}{" "}
              - {end_time ? dayjs(end_time).format("hh:mm A") : "TBA"}
              {"   "}
              {dayjs(start_time).format("z")}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 328,
      },
    );
  } catch (error) {
    console.log(`${(error as Error).message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
