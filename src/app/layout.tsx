import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";

import NavBar from "@/components/navBar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Games Recaped",
  description: "Get the latest conference updates!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
        <meta property="og:title" content="Games Recaped" />
        <meta
          property="og:description"
          content="Get the latest conference updates"
        />
        <meta property="og:image" content="/android-chrome-192x192.png" />
        <meta property="og:image:type" content="image/png" />
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
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
