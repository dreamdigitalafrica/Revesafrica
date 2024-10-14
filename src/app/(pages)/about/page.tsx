import SupportUsSection from "@/components/sections/support.section";
import Image from "next/image";
import Link from "next/link";

interface AboutProps {}

const objectivesData = [
  {
    title: "Empower Digital Inclusion",
    description:
      "Equip young adults, particularly girls and people with disabilities, with digital skills to compete equally with their peers and earn a sustainable living.",
  },

  {
    title: "Digital Skills for Economic Empowerment",
    description:
      "Build the capacity of youth to leverage digital skills for entrepreneurship, employment, and economic growth.",
  },
  {
    title: "Rural Digital Literacy",
    description:
      "Improve digital literacy and access to digital resources within rural communities, bridging the digital divide and fostering inclusive development.",
  },
];

const coreValuesData = [
  {
    title: "Empowerment",
    description:
      "We believe in the inherent potential of every young person and are committed to empowering them to become leaders and change-makers.",
  },
  {
    title: "Equality",
    description:
      "We strive for a society where all individuals have equal opportunities, regardless of their background or circumstances.",
  },
  {
    title: "Compassion",
    description:
      "We approach our work with empathy and understanding, recognizing the challenges faced by our beneficiaries.",
  },
  {
    title: "Integrity",
    description:
      "We conduct our work with honesty, transparency, and accountability.",
  },
  {
    title: "Excellence",
    description:
      "We strive for the highest standards in all aspects of our work.",
  },
  {
    title: "Collaboration",
    description:
      " We believe in the power of partnerships and collaboration to achieve our goals.",
  },
];

const About = ({}: AboutProps) => {
  return (
    <main className="pb-12 pt-4 aboutPage">
      <div className="container flex flex-col gap-4">
        <section id="about-us" className="">
          <div className=" flex w-full flex-col gap-8">
            <div className="relative overflow-hidden max-h-[400px] md:max-h-[700px] md:h-[83vh] h-[65vh] w-full">
              <Image
                src={"/images/about-us-page-bg.jpeg"}
                quality={100}
                alt="About Illustration"
                fill
                loading="lazy"
                className="h-full w-full object-cover overflow-hidden border-2 rounded-3xl md:rounded-[48px] border-green-500 "
              />

              <div className="absolute md:rounded-tr-[48px] md:rounded-tl-[48px] rounded-tl-3xl rounded-tr-3xl bg-[#ededed] right-0 bottom-0 py-6 px-10">
                <h1 className="text-4xl md:text-6xl tracking-wide font-bold">
                  About <br />
                  <span className="text-green-600">Us</span>
                </h1>
              </div>
            </div>

            <p className="w-full">
              Founded in November 2021, Reves is a non-governmental
              organisation(NGO) dedicated to empowering vulnerable youth and
              children, specifically those living in marginalized communities
              across Africa. We provide essential support, resources, and
              opportunities to youths to reach their full potential and become
              active member of their communities.&nbsp;&nbsp;
            </p>
          </div>
        </section>

        <section>
          <h2 className="section-title before:bg-[#3AF40C]">Our Vision</h2>
          <p>
            We envision a world where all African youth and children have equal
            opportunities to thrive and contribute to the development of their
            communities.
          </p>
        </section>

        <section>
          <h2 className="section-title before:bg-[#ECD400]">
            Our Mission Statement
          </h2>
          <p className="rounded-xl p-4 bg-[#ECD4004D]">
            Empowering marginalised African youth and children, specifically
            those limited by poverty and underrepresented to reach their full
            potential through education, holistic well-being, skills
            development, and access to economic opportunities, enabling them to
            become active and contributing members of their communities. 
          </p>
        </section>

        {/*  */}
        <section>
          <h2 className="section-title before:bg-[#0C4DF4] text-black">
            Our Goal
          </h2>
          <p className="rounded-xl p-4 bg-[#0C4DF44D]">
            Our goal is to identify and address unique challenges facing
            marginalised youths and children, designing need-based interventions
            and programmes that empower them to become active contributors to
            their communities.
          </p>
        </section>

        {/*  */}
        <section>
          <h2 className="section-title before:bg-[#3AF40C] text-black">
            Our Objectives
          </h2>

          <ul className="pl-8 flex flex-col gap-4">
            {objectivesData.map((objective, index) => (
              <li key={index}>
                <span className="font-bold">{objective.title}:</span>{" "}
                {objective.description}
              </li>
            ))}
          </ul>
        </section>

        {/*  */}
        <section>
          <h2 className="section-title before:bg-yellow-400">Core Values</h2>

          <ol className="list-decimal pl-8 flex flex-col gap-4">
            {coreValuesData.map((coreValue, index) => (
              <li key={index}>
                <span>{coreValue.title}</span> {coreValue.description}
              </li>
            ))}
          </ol>
        </section>

        {/*  */}
        <section className="md:mt-40 mt-12 mb-8">
          <SupportUsSection />
        </section>
      </div>
    </main>
  );
};

export default About;
