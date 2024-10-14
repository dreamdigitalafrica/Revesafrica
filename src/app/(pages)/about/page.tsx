import Image from "next/image";
import Link from "next/link";

interface AboutProps {}

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

            <p className="w-full md:max-w-[66vw]">
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
          <h2 className="section-title !bg-green-300">Our Vision</h2>
          <p>
            We envision a world where all African youth and children have equal
            opportunities to thrive and contribute to the development of their
            communities.
          </p>
        </section>

        {/*  */}
        <section>
          <h2 className="section-title bg-yellow-400">Core Values</h2>

          <ol className="list-decimal pl-8 flex flex-col gap-4">
            {coreValuesData.map((coreValue, index) => (
              <li key={index}>
                <span>{coreValue.title}</span> {coreValue.description}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
};

export default About;
