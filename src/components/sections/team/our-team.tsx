"use client";

import TeamCard from "@/components/shared/TeamCard";
import { useTeam } from "@/lib/hook";
import React from "react";

export default function OurTeamSection() {
  const { data: teamMembers, error } = useTeam();

  console.log(teamMembers);

  if (error) {
    console.error("Error loading projects:", error);
    return <p>Error loading projects. Please try again later.</p>;
  }

  if (!teamMembers) {
    return <p>Loading...</p>;
  }

  console.log(teamMembers);

  return (
    <div className="grid md:grid-cols-3 justify-between gap-x-8 overflow-x-auto gap-y-16 max-w-full">
      {teamMembers.map((teamMember, index) => (
        <TeamCard key={index} {...teamMember} />
      ))}
    </div>
  );
}
