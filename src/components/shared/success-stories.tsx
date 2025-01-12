"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useCallback, useState } from "react";

import OverLayStack from "../overlay-carousel";
import { SUCCESS_STORIES_DATA } from "@/lib/constants";
import OverLayItem from "../overlay-carousel/overlay-item";

const SuccessStoriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const controller = (index: number): void => {
    setCurrentIndex(index);
  };

  const autoplayController = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < SUCCESS_STORIES_DATA.length - 1 ? prev + 1 : 0
    );
  }, []);

  return (
    <main className="w-full h-fit px-5 md:px-14">
      <OverLayStack
        controller={controller}
        autoplayController={autoplayController}
        itemLength={SUCCESS_STORIES_DATA.length}
        currentIndex={currentIndex}
        className="w-full h-[50dvh] hidden md:flex"
      >
        {SUCCESS_STORIES_DATA.map((datum, i) => (
          <OverLayItem
            {...datum}
            itemIndex={i}
            key={datum.title}
            itemsLen={SUCCESS_STORIES_DATA.length}
            activeIndex={currentIndex}
          />
        ))}
      </OverLayStack>

      <Marquee delay={2} pauseOnHover>
        {SUCCESS_STORIES_DATA.map(({ src, title }, i) => (
          <section
            key={title + i}
            className="p-3 rounded-lg mx-2 shadow-xl flex flex-col space-y-4 bg-gray-300 md:hidden"
          >
            <div className="w-fit h-fit">
              <Image
                width={270}
                height={300}
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
          </section>
        ))}
      </Marquee>
    </main>
  );
};

export default SuccessStoriesSection;
