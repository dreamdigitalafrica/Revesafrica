import OurTeamSection from "@/components/sections/team/our-team";
import React from "react";

export default function TeamPage() {
  return (
    <section className="w-full md:px-14 h-fit flex flex-col px-4 py-10 space-y-14 ">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl mb-12 md:text-5xl  text-center">
          Our <span className="font-semibold">Team</span>{" "}
        </h2>

        <OurTeamSection />
      </div>
    </section>
  );
}
