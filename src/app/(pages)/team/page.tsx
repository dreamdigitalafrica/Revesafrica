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
  return (
    <section className="w-full md:px-14 h-fit flex flex-col px-4 py-10 space-y-14">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<Loading />}>
          <h2 className="text-4xl mb-12 font-bold md:text-5xl text-center">
            Our <span className="text-green-400">Team</span>
          </h2>
          <OurTeamSection />
        </Suspense>
      </div>
    </section>
  );
}
