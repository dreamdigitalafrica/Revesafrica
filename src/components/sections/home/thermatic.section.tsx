"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

interface ThermaticSectionProps {}

const ThermaticSection = ({}: ThermaticSectionProps) => {
  return (
    <section className="flex flex-col px-6 space-y-5 md:px-14 py-8 md:py-12">
      <h1 className="text-3xl font-semibold text-gray-700  md:text-5xl">
        Our Thermatic Areas
      </h1>

      <Marquee delay={2} pauseOnHover className="p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-[10rem] md:h-[14rem]  cursor-pointer w-[11rem] md:w-[14.8rem] mr-8 md:mr-16 overflow-hidden relative flex-shrink-0 shadow-sm border py-2 rounded-2xl"
          >
            <Image
              loading="lazy"
              fill
              quality={100}
              alt={`Thermatic Area ${index + 1}`}
              className="h-full w-full object-cover"
              src={`/images/thermatic-areas/${index + 1}.png`}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default ThermaticSection;
