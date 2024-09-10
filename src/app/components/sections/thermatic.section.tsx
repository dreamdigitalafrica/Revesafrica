"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

interface ThermaticSectionProps {}

const ThermaticSection = ({}: ThermaticSectionProps) => {
  return (
    <section className=" container py-8">
      <div className="prose mb-8">
        <h1 className="">Our Thermatic Areas</h1>
      </div>

      <Marquee pauseOnHover>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-[14rem] md:h-[16em] cursor-pointer w-[16rem] md:w-[17rem] mr-4 md:mr-6 overflow-hidden relative flex-shrink-0 shadow-sm border p-4 rounded-xl"
          >
            <Image
              loading="lazy"
              height={480}
              width={720}
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
