import { pbUrl } from "@/lib/pocketbase.util";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";

type TeacmCardProps = {
  id: string;
  name: string;
  profile_image: string;
  bio: string;
  role: string;
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
  collectionId,
}: TeacmCardProps) {
  return (
    <div className="rounded-xl w-full max-w-full flex flex-col gap-4 p-2">
      <Image
        src={`${pbUrl}api/files/${collectionId}/${id}/${profile_image}`}
        alt={`${name} image`}
        height={1080}
        width={1080}
        quality={75}
        loading="lazy"
        className="h-96 rounded-xl w-full object-cover shadow-md drop-shadow-md"
      />
      <h2 className="text-2xl md:text-4xl font-medium">{name}</h2>

      <div className="flex flex-col gap-1">{role}</div>
      <div className="flex gap-2 items-center">
        <FaFacebook size={24} />
        <FaLinkedin size={24} />
      </div>
    </div>
  );
}
