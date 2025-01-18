import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full h-fit md:flex md:flex-col md:space-y-11 md:items-center md:justify-center">
      <h3 className="hidden items-center font-extrabold md:flex md:space-x-3 md:text-5xl">
        <span>Our</span>
        <span className="text-[#3AF40C]">Projects</span>
      </h3>

      <>
        <Image
          alt=""
          width={677}
          quality={100}
          loading="lazy"
          height={316.06}
          src="/project-hero-image.svg"
          className="w-full shadow-lg md:hidden"
        />

        <Image
          width={1478}
          height={690}
          quality={100}
          loading="lazy"
          alt="project hero image"
          src="/project-hero-image.svg"
          className="w-full hidden md:block"
        />
      </>
    </section>
  );
};

export default HeroSection;
