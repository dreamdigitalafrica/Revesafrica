"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { Variants, motion } from "framer-motion";

import { Post } from "@/types";
import { pbUrl } from "@/lib/pocketbase.util";
import { computeZindex, getVariant, translate } from "./helper-function";

interface Props {
  post: Post;
  itemsLen: number;
  itemIndex: number;
  activeIndex: number;
}

const OverLayItem = ({ post, itemsLen, itemIndex, activeIndex }: Props) => {
  const [z, setZ] = useState<number>(() =>
    computeZindex({ activeIndex, itemIndex, itemsLen })
  );

  const [variant, setVariant] = useState<"active" | "inactive">(() =>
    getVariant({ itemIndex, activeIndex })
  );

  useEffect(() => {
    setVariant(getVariant({ itemIndex, activeIndex }));

    setZ(computeZindex({ activeIndex, itemIndex, itemsLen }));
  }, [activeIndex, itemIndex, itemsLen]);

  const variants: Variants = {
    active: {
      scale: 1,
      zIndex: z,
      opacity: 1,
    },
    inactive: {
      zIndex: z,
      scale: 0.9,
    },
  };

  return (
    <motion.section
      initial={variant}
      animate={variant}
      variants={variants}
      style={{
        left: activeIndex === itemIndex ? undefined : translate(itemIndex),
      }}
      className={`p-3 w-96 h-80 absolute rounded-lg shadow-xl flex flex-col justify-between bg-gray-300 z-[${z}]`}
    >
      <div className="w-full h-3/5 overflow-hidden relative">
        <Image
          fill
          quality={100}
          alt={post.title}
          className="w-full h-full object-cover rounded-lg"
          src={`${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`}
        />
      </div>

      <div className="w-full flex flex-col space-y-2 px-2">
        <h3 className="font-bold text-lg">{post.title}</h3>

        <Link
          href={`/blog/${post.id}`}
          className="w-full flex items-center space-x-2 justify-end text-gray-700 text-sm"
        >
          <span className="font-light">see more</span>
          <FaGreaterThan className="font-extralight" />
        </Link>
      </div>
    </motion.section>
  );
};

export default OverLayItem;
