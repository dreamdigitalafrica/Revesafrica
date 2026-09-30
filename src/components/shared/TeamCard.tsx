import { TeamMember } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";


export default function TeamCard({
  name,
  role,
  profile_image,
  username,
}: TeamMember) {
  return (
    <Link
      href={`/team/${encodeURIComponent(username)}`}
      className="reves-team-card"
    >
      <Image
        src={profile_image || "/reves-logo-dark.png"}
        alt={`${name} image`}
        height={1080}
        width={1080}
        quality={75}
        loading="lazy"
        className="h-[24rem] md:h-[28.5rem] rounded-xl w-full object-cover shadow-md drop-shadow-md"
      />

      <div className="flex flex-col">
        <h2 className="text-2xl line-clamp-1 text-ellipsis md:text-3xl text-gray-700 font-semibold">
          {name}
        </h2>

        <p className="text-gray-500 font-medium">{role}</p>
        <span className="reves-text-link">Meet {name.split(" ")[0]} ↗</span>
      </div>
    </Link>
  );
}
