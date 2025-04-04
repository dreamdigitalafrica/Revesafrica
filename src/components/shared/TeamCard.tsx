import { pbUrl } from "@/lib/pocketbase.util";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";

type TeacmCardProps = {
  id: string;
  name: string;
  profile_image: string;
  bio: string;
  role: string;
  username: string;
  collectionId: string;
  socials: {
    name: string;
    handle: string;
  };
};

export default function TeamCard({
  id,
  name,
  role,
  profile_image,
  username,
  collectionId,
}: TeacmCardProps) {
  return (
    <Link
      href={`/team/${username}`}
      className="rounded-xl w-full max-w-full flex flex-col gap-2 p-2"
    >
      <Image
        src={`${pbUrl}api/files/${collectionId}/${id}/${profile_image}`}
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
        <div className="flex gap-4 mt-1 items-center">
          <FaInstagram size={30} />
          <FaLinkedin size={30} />
        </div>
      </div>
    </Link>
  );
}
