import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/index.scss";
import Footer from "./components/footer";
import Header from "./components/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.revesfoundation.org/"),
  title: "Reves Foundation (RAYCD)",
  description:
    "We are centred on bridging gaps through technology in the minority African communities.",
  openGraph: {
    title: "Reves Foundation (RAYCD)",
    description:
      "We are centred on bridging gaps through technology in the minority African communities",
    images: [
      {
        url: "/reves-logo-dark.png", // Path to your OG image
        width: 1200,
        height: 630,
        alt: "Reves Foundation OG Image", // Alt text for the image
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
