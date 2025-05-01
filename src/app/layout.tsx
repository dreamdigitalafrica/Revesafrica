import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./styles/index.scss";
import Header from "../components/shared/header";
import Footer from "@/components/shared/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "600", "800", "900"],
});

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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <NextTopLoader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
