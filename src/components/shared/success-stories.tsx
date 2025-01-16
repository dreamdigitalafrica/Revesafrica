"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useCallback, useState } from "react";

import { useRevesProject } from "@/lib/hook";
import OverLayStack from "../overlay-carousel";
import OverLayItem from "../overlay-carousel/overlay-item";
import { pbUrl } from "@/lib/pocketbase.util";

const SuccessStoriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data: posts, error } = useRevesProject();

  const controller = (index: number): void => {
    setCurrentIndex(index);
  };

  const autoplayController = useCallback(() => {
    setCurrentIndex((prev) =>
      prev < (posts?.length as number) - 1 ? prev + 1 : 0
    );
  }, [posts?.length]);

  if (error) {
    console.error("Error loading projects:", error);
    return <p>Error loading success stories. Please try again later.</p>;
  }

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <main className="w-full h-fit px-5 md:px-14">
      <OverLayStack
        controller={controller}
        autoplayController={autoplayController}
        itemLength={posts.length}
        currentIndex={currentIndex}
        className="w-full h-[50dvh] hidden md:flex"
      >
        {posts.map((post, i) => (
          <OverLayItem
            post={post}
            itemIndex={i}
            key={post.title + "desktop"}
            itemsLen={posts.length}
            activeIndex={currentIndex}
          />
        ))}
      </OverLayStack>

      <Marquee delay={2} pauseOnHover>
        {posts.map((post) => (
          <section
            key={post.title + "mobile"}
            className="p-3 rounded-lg mx-2 shadow-xl flex flex-col space-y-4 bg-gray-300 md:hidden"
          >
            <div className="h-[10rem] md:h-[12rem] w-full overflow-hidden relative">
              {post.featuredImage && (
                <Image
                  fill
                  quality={100}
                  alt={post.title}
                  className="h-full w-full object-cover rounded-xl"
                  src={`${pbUrl}api/files/${post.collectionId}/${post.id}/${post.featuredImage}`}
                />
              )}
            </div>

            <div className="w-full flex flex-col space-y-2 px-2">
              <h3 className="font-bold text-lg">{post.title}</h3>

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
