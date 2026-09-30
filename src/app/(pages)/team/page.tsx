// src/app/team/page.tsx
import OurTeamSection from "@/components/sections/team/our-team";
import React, { Suspense } from "react";
import { Metadata } from "next";
import Loading from "@/components/shared/loading";

// Generate metadata for the Team page
export const metadata: Metadata = {
  title: "Our Team - Reves African Youth and Children Foundation",
  description:
    "Meet our RAYCD team of experts dedicated to delivering excellence.",
  openGraph: {
    title: "Our Team - Reves African Youth and Children Foundation",
    description:
      "Meet our RAYCD team of experts dedicated to delivering excellence.",
    url: "/team",
    images: [
      {
        url: "/reves-logo-dark.png", // Replace with an actual image URL for social sharing
        width: 1200,
        height: 630,
        alt: "Our Team",
      },
    ],
  },
};

export default function TeamPage() {
  return <main className="reves-editorial reves-wrap"><header className="reves-page-heading"><p className="reves-eyebrow">Our people</p><h1>A shared belief.<br /><em>A committed team.</em></h1><p>Meet the people helping turn our mission into everyday action.</p></header><div className="reves-team-list"><Suspense fallback={<Loading />}><OurTeamSection /></Suspense></div></main>;
}
