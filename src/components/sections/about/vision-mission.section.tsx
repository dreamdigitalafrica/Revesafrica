import { CORE_VALUE_DATA, OBJECTIVES_DATA } from "@/lib/constants";
import React from "react";

const VisionMissionSection = () => {
  return (
    <>
      <section className="about-section-con container space-y-1">
        <h4 className="about-section-title bg-[#3AF40C]">Our Vision</h4>

        <p className="about-section-text">
          We envision a world where all African youth and children have equal
          opportunities to thrive and contribute to the development of their
          communities.
        </p>
      </section>

      <section className="about-section-con container space-y-5">
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

      <section className="about-section-con container space-y-5">
        <h4 className="about-section-title bg-[#0C4DF4]">Our Goal</h4>

        <p className="about-section-text bg-blue-200">
          Our goal is to identify and address unique challenges facing
          marginalised youths and children, designing need-based interventions
          and programmes that empower them to become active contributors to
          their communities.
        </p>
      </section>

      <section className="about-section-con container space-y-5">
        <h4 className="about-section-title bg-[#3AF40C]">Our Objectives</h4>

        <p className="about-section-text flex flex-col space-y-3 bg-green-200">
          {OBJECTIVES_DATA.map(({ title, description }, i) => (
            <span key={title + i}>
              <span className="font-bold">{title}:</span> {description}
            </span>
          ))}
        </p>
      </section>

      <section className="about-section-con container space-y-5">
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
    </>
  );
};

export default VisionMissionSection;
