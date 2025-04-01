import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGreaterThan } from "react-icons/fa";

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
  return (
    <section className="p-4 mr-4 rounded-xl flex flex-col justify-between gap-2 w-full max-w-sm border bg-white">
      <div className="flex flex-col">
        <div className="h-[10rem] md:h-[12rem] w-full overflow-hidden relative">
          {featuredImage && (
            <Image
              fill
              quality={100}
              alt={title}
              className="h-full w-full object-cover rounded-xl"
              src={`${pbUrl}api/files/${collectionId}/${id}/${featuredImage}`}
            />
          )}
        </div>
        <h2 className="text-xl md:text-2xl leading-tight font-light my-2 line-clamp-3">
          {title}
        </h2>
      </div>

      <div className="flex justify-between mt-4 text-gray-500">
        <div className="flex items-center font-light text-xs gap-1">
          <p className="">By {author}</p> |
          <p className="">{publishDate || "November 2021"} </p>
        </div>
        <Link
          href={`/blog/${id}`}
          className="text-sm font-light flex items-center space-x-1"
        >
          <span>see more</span>
          <FaGreaterThan />
        </Link>
      </div>
    </section>
  );
};

export default PostCard;
