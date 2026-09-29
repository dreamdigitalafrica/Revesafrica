"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCaretRight } from "react-icons/fa6";

interface Props {
  id: string;
  pbUrl: string;
  title: string;
  author: string;
  publishDate: string;
  collectionId: string;
  featuredImage: string;
}

const PostCard = ({
  id,
  title,
  pbUrl,
  author,
  publishDate,
  collectionId,
  featuredImage,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageUrl = `${pbUrl}api/files/${collectionId}/${id}/${featuredImage}`;
  const formattedDate = publishDate || "November 2021";

  return (
    <article className="group p-4 ml-4 rounded-xl w-full max-w-sm border bg-white flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 md:h-56 w-full rounded-lg overflow-hidden bg-gray-100">
        {!isImageLoaded && (
          <div className="w-full h-full animate-pulse bg-gray-200 rounded-lg" />
        )}
        {featuredImage && (
          <Image
            src={imageUrl}
            alt={title || "Post thumbnail"}
            fill
            className={`object-cover rounded-lg transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsImageLoaded(true)}
            quality={90}
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        )}
      </div>

      <div className="mt-4 flex flex-col space-y-2">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-3 leading-snug">
          {title}
        </h2>

        <div className="text-xs text-gray-500 flex justify-between items-center">
          <span>
            By {author} | {formattedDate}
          </span>
          <Link
            href={`/projects/${id}`}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>See more</span>
            <FaCaretRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
