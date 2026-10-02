import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import "./styles/index.scss";
import SiteFrame from "@/components/shared/site-frame";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.revesfoundation.org/"),
  title: "Reves African Youth and Children Development Foundation (RAYCD)",
  description:
    "We are centred on bridging gaps through technology in the minority African communities.",
  openGraph: {
    title: "Reves African Youth and Children Development Foundation (RAYCD)",
    description:
      "We are centred on bridging gaps through technology in the minority African communities",
    images: [
      {
        url: "/reves-logo-dark.png",
        width: 1200,
        height: 630,
        alt: "Reves Foundation OG Image",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="preload" href="/fonts/NotoSans-ExtraCondensed-Black.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/NotoSerif-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <NextTopLoader />
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
