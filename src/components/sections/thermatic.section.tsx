"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

interface ThermaticSectionProps {}

const ThermaticSection = ({}: ThermaticSectionProps) => {
  return (
    <section className=" container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-medium">Our Thermatic Areas</h1>
      </div>

      <Marquee delay={2} pauseOnHover>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-[11rem] md:h-[12.5rem] cursor-pointer w-[12rem] md:w-[13.3rem] mr-8 md:mr-12 overflow-hidden relative flex-shrink-0 shadow-sm border rounded-xl"
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
