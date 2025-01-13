import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutUsSection = () => {
  return (
    <section className="w-full h-fit flex flex-col space-y-4 py-10 md:space-y-7 md:px-14">
      <aside className="w-full flex flex-col space-y-5 md:space-y-0 md:relative">
        <Image
          alt=""
          width={677}
          height={316.06}
          className="w-full md:hidden"
          src={"/about-us-mobile.png"}
        />

        <Image
          alt=""
          width={1478}
          height={690}
          loading="lazy"
          quality={100}
          src={"/about-us-desktop.png"}
          className="w-full hidden md:block"
        />

        <h3 className="px-5 flex space-x-3 text-4xl md:absolute md:flex-col md:right-16 md:bottom-16 md:space-y-1 md:space-x-0 md:text-7xl font-extrabold">
          <span>About</span>
          <span className="text-[#3AF40C]">Us</span>
        </h3>
      </aside>

      <div className="px-5 flex flex-col space-y-3">
        <p className="text-sm md:w-3/5 md:text-lg">
          Founded in November 2021, Reves is a non-governmental
          organisation(NGO) dedicated to empowering vulnerable youth and
          children, specifically those living in marginalized communities across
          Africa. We provide essential support, resources, and opportunities to
          youths to reach their full potential and become active member of their
          communities.{" "}
          <Link
            href="/about"
            className="hidden font-semibold text-sm text-red-600 md:inline"
          >
            Read more
          </Link>
        </p>

        <Link
          href="/about"
          className="font-semibold text-sm text-red-600 md:hidden"
        >
          Read more
        </Link>
      </div>
    </section>
  );
};

export default AboutUsSection;
