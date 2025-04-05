// src/components/sections/OurTeamSection.tsx
"use client";

import Loading from "@/components/shared/loading";
import TeamCard from "@/components/shared/TeamCard";
import { useTeam } from "@/lib/hook";
import { TeamMember } from "@/types";
import React from "react";

export default function OurTeamSection() {
  const { data: teamMembers, error } = useTeam();

  if (error) {
    console.error("Error loading team members:", error);
    return (
      <p className="text-center text-red-500">
        Error loading team members. Please try again later.
      </p>
    );
  }

  if (!teamMembers) {
    return <Loading />;
  }

  if (teamMembers.length === 0) {
    return (
      <p className="text-center text-gray-500">No team members available.</p>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-x-8 gap-y-16 max-w-full">
      {teamMembers.map((teamMember: TeamMember) => (
        <TeamCard key={teamMember.id} {...teamMember} />
      ))}
    </div>
  );
}
