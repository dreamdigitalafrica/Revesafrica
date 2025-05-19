"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const THEMATIC_AREAS = [
  {
    id: 1,
    title: "Education & Mentorship",
    image: "/images/thermatic-areas/1.png",
  },
  {
    id: 2,
    title: "Health & Well-being",
    image: "/images/thermatic-areas/2.png",
  },
  { id: 3, title: "Youth Empowerment", image: "/images/thermatic-areas/3.png" },
  { id: 4, title: "Gender Equality", image: "/images/thermatic-areas/4.png" },
  { id: 5, title: "Child Protection", image: "/images/thermatic-areas/5.png" },
  {
    id: 6,
    title: "Community Engagement",
    image: "/images/thermatic-areas/6.png",
  },
  { id: 7, title: "Innovation & Tech", image: "/images/thermatic-areas/7.png" },
  { id: 8, title: "Sustainability", image: "/images/thermatic-areas/8.png" },
];

const ThematicSection = () => {
  return (
    <section
      className="flex container flex-col px-6 space-y-6 md:px-14 py-10 md:py-16"
      aria-labelledby="thematic-title"
    >
      <h2
        id="thematic-title"
        className="text-3xl md:text-5xl font-semibold text-gray-800"
      >
        Our Thematic Areas
      </h2>

      <Marquee
        delay={2}
        pauseOnHover
        gradient={false}
        className="pt-4 space-x-4"
      >
        {THEMATIC_AREAS.map((area) => (
          <div
            key={area.id}
            className="relative h-40 md:h-56 w-44 md:w-60 mr-6 md:mr-12 flex-shrink-0 rounded-2xl overflow-hidden shadow-md border"
          >
            <Image
              src={area.image}
              alt={area.title}
              fill
              className="object-cover"
              quality={90}
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ThematicSection;
