import SupportUsSection from "@/components/sections/support.section";
import { CORE_VALUE_DATA, OBJECTIVES_DATA } from "@/lib/constants";
import Image from "next/image";

const About = () => {
  return (
    <main className="w-full h-fit flex flex-col space-y-6 px-4 py-10 md:space-y-12 md:px-14">
      <aside className="w-full flex flex-col space-y-10 md:relative">
        <div className="w-full flex flex-col space-y-2 md:space-y-0 md:relative">
          <Image
            alt=""
            width={677}
            quality={100}
            loading="lazy"
            height={316.06}
            src={"/images/about-us-page-bg.jpeg"}
            className="w-full shadow-lg md:hidden"
          />

          <Image
            alt=""
            width={1478}
            height={690}
            quality={100}
            loading="lazy"
            src={"/about-hero-image.png"}
            className="w-full hidden md:block"
          />

          <h3 className="flex space-x-3 text-3xl md:absolute md:flex-col md:right-16 md:bottom-16 md:space-y-1 md:space-x-0 md:text-7xl font-extrabold">
            <span>About</span>
            <span className="text-[#3AF40C]">Us</span>
          </h3>
        </div>

        <p className="w-full text-lg md:text-xl md:w-11/12">
          Founded in November 2021, <span className="font-medium">Reves</span>{" "}
          is a non-governmental organisation(NGO)  dedicated to empowering
          vulnerable youth and children, specifically those living in
          marginalised communities across Africa. We provide essential support,
          resources, and opportunities to youths to reach their full potential
          and become active member of their communities.
        </p>
      </aside>

      <section className="about-section-con space-y-1">
        <h4 className="about-section-title bg-[#3AF40C]">Our Vision</h4>

        <p className="about-section-text">
          We envision a world where all African youth and children have equal
          opportunities to thrive and contribute to the development of their
          communities.
        </p>
      </section>

      <section className="about-section-con space-y-5">
        <h4 className="about-section-title bg-[#ecd400]">
          Our Mission Statement
        </h4>

        <p className="about-section-text bg-yellow-200">
          Empowering marginalised African youth and children, specifically those
          limited by poverty and underrepresented to reach their full potential
          through education, holistic well-being, skills development, and access
          to economic opportunities, enabling them to become active and
          contributing members of their communities.
        </p>
      </section>

      <section className="about-section-con space-y-5">
        <h4 className="about-section-title bg-[#0C4DF4]">Our Goal</h4>

        <p className="about-section-text bg-blue-200">
          Our goal is to identify and address unique challenges facing
          marginalised youths and children, designing need-based interventions
          and programmes that empower them to become active contributors to
          their communities.
        </p>
      </section>

      <section className="about-section-con space-y-5">
        <h4 className="about-section-title bg-[#3AF40C]">Our Objectives</h4>

        <p className="about-section-text flex flex-col space-y-3 bg-green-200">
          {OBJECTIVES_DATA.map(({ title, description }, i) => (
            <span key={title + i}>
              <span className="font-bold">{title}:</span> {description}
            </span>
          ))}
        </p>
      </section>

      <section className="about-section-con space-y-5">
        <h4 className="w-fit font-semibold rounded-2xl text-xl pl-3">
          Core Values
        </h4>

        <ol className="about-section-text flex flex-col space-y-3 bg-gray-200">
          {CORE_VALUE_DATA.map(({ title, description }, i) => (
            <li key={title + i} className="pl-2">
              <span className="font-bold">{i + 1}. </span>
              {title}: {description}
            </li>
          ))}
        </ol>
      </section>

      <section className="h-[520px] my-12 w-full overflow-hidden">
        <Image
          src={"/images/reves-foundation-certificate.webp"}
          alt="Reves foundation certificate"
          height={1920}
          width={980}
          className="h-full w-full object-contain"
        />
      </section>

      <SupportUsSection />
    </main>
  );
};

export default About;
