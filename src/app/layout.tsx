import "@/styles/globals.css";
import "../@types/string.d.ts";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";

import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";

const favicon =
  new Date().getMonth() === 5 ? "/favicon-pride.ico" : "/favicon.ico";

export const metadata = {
  title:
    "Games Recapped | Ultimate Summer Game Fest Recap | Trailers, Livestreams & More",
  description:
    "Discover the ultimate roundup of Summer Game Fest and beyond, featuring trailers, demos, gameplay highlights, livestreams, and exclusive announcements. Stay ahead in the gaming universe with our comprehensive recap, bringing you the latest updates, insights, and reveals from the gaming industry's hottest events",
  icons: [{ rel: "icon", url: favicon }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta property="og:title" content="Games Recapped" />
        <meta
          name="keywords"
          content="summer game fest, gaming, trailers, demos, gameplay, livestreams, announcements, gaming industry"
        />
        <meta
          property="og:description"
          content="Discover the ultimate roundup of Summer Game Fest and beyond, featuring trailers, demos, gameplay highlights, livestreams, and exclusive announcements. Stay ahead in the gaming universe with our comprehensive recap, bringing you the latest updates, insights, and reveals from the gaming industry's hottest events."
        />
        <meta property="og:image" content="/social-large.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta name="author" content="Tommy Danks" />
        <meta name="language" content="English" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Games Recap - Your Source for Gaming News from Summer Game Fest and Beyond"
        />
        <meta
          name="twitter:description"
          content="
          Discover the ultimate roundup of Summer Game Fest and beyond, featuring trailers, demos, gameplay highlights, livestreams, and exclusive announcements. Stay ahead in the gaming universe with our comprehensive recap, bringing you the latest updates, insights, and reveals from the gaming industry's hottest events
          "
        />
        <meta name="twitter:image" content="/social-large.webp" />

        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="b31ac805-911c-4f85-bf0c-c68814b13e15"
        />
      </head>

      <body>
        <NextTopLoader
          color="#8700ed"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #ffff,0 0 5px #ffff"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <NavBar />
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster />

            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
