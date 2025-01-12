"use client";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import {
  computeScale,
  computeZindex,
  getVariant,
  translate,
} from "./helper-function";
import { useEffect, useState } from "react";

interface Props {
  src: string;
  title: string;
  itemsLen: number;
  itemIndex: number;
  activeIndex: number;
}

const OverLayItem = ({
  src,
  title,
  itemsLen,
  itemIndex,
  activeIndex,
}: Props) => {
  const [z, setZ] = useState<number>(() =>
    computeZindex({ activeIndex, itemIndex, itemsLen })
  );
  const [scale, setScale] = useState<number>(() =>
    computeScale({ activeIndex, itemIndex })
  );

  const [variant, setVariant] = useState<"active" | "inactive">(() =>
    getVariant({ itemIndex, activeIndex })
  );

  useEffect(() => {
    setVariant(getVariant({ itemIndex, activeIndex }));
    setZ(computeZindex({ activeIndex, itemIndex, itemsLen }));
    setScale(computeScale({ activeIndex, itemIndex }));
  }, [activeIndex, itemIndex, itemsLen]);

  const variants: Variants = {
    active: {
      scale: 1,
      zIndex: z,
    },
    inactive: {
      zIndex: z,
      scale: scale,
    },
  };

  return (
    <motion.section
      variants={variants}
      initial={variant}
      animate={variant}
      style={{ left: translate(itemIndex) }}
      className={`p-3 absolute rounded-lg shadow-xl flex flex-col space-y-4 bg-gray-300 z-[${z}]`}
    >
      <div className="w-fit h-fit">
        <Image
          width={370}
          height={400}
          src={src}
          className="rounded-lg"
          alt="success stories image"
        />
      </div>

      <div className="w-full flex flex-col space-y-2 px-2">
        <h3 className="font-bold text-lg">{title}</h3>

        <div className="w-full flex justify-end text-gray-700 font-light text-sm">
          see more
        </div>
      </div>
    </motion.section>
  );
};

export default OverLayItem;
