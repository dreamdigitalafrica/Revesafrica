import Image from "next/image";

interface AboutUsSectionProps {}

const AboutUsSection = ({}: AboutUsSectionProps) => {
  return (
    <section id="about-us" className="py-12">
      <div className="container px-4 flex w-full flex-col gap-8">
        <div className="relative overflow-hidden rounded-xl h-[80vh] bg-green-200 w-full">
          <Image
            src={"/images/hero-2-img.wbep"}
            quality={100}
            alt="About Illustration"
            height={1920}
            width={1980}
            loading="lazy"
            className="h-full w-full object-cover"
          />

          <div className="absolute rounded-tl-xl bg-[#ededed] right-0 bottom-0 py-8  px-12">
            <h1 className="text-4xl md:text-6xl font-bold">
              About <br />
              <span className="text-green-600">Us</span>
            </h1>
          </div>
        </div>

        <p className="w-full md:max-w-[70vw]">
          Founded in November 2021, Reves is a non-governmental
          organisation(NGO) dedicated to empowering vulnerable youth and
          children, specifically those living in marginalized communities across
          Africa. We provide essential support, resources, and opportunities to
          youths to reach their full potential and become active member of their
          communities.
        </p>
      </div>
    </section>
  );
};

export default AboutUsSection;
