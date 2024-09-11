import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {}

const HeroSection = ({}: HeroSectionProps) => {
  return (
    <section className="h-screen bg-gray-100 hero-section">
      <div className="flex h-full relative md:grid-cols-2">
        <div className="prose py-8 px-4 md:px-16 w-full md:w-[55%] shrink-0 flex flex-col justify-center  items-center md:pr-24">
          <h1 className="text-5xl mb-0">
            Empowering vulnerable youth and children
          </h1>
          <p>
            Founded in November 2021, Reves is a non-governmental
            organisation(NGO) dedicated to empowering vulnerable youth and
            children, specifically those living in marginalized communities
            across Africa.
          </p>
        </div>

        <div className="hidden md:flex w-full h-full overflow-hidden">
          <Image
            src={"/hero-image.png"}
            alt="Hero image"
            height={1080}
            width={1080}
            className="w-full h-full object-cover"
          />
        </div>

        <Link
          href="https://flutterwave.com/donate/fqla2cajv8yi?_gl=1%2ahjgupl%2a_gcl_au%2aMTU1MDEzNzk2NC4xNzI1ODk5NjE0%2a_ga%2aMTQzMjAwNzc2MC4xNzIzMTE3MzM3%2a_ga_KQ9NSEMFCF%2aMTcyNTg5OTIwMy4yLjEuMTcyNTkwMDA1Ny41OS4wLjA."
          target="_blank"
        >
          <button className="absolute bottom-16 px-8 text-white py-2.5  md:text-xl font-semibold bg-bluen rounded-full left-[50%] translate-x-[-50%]">
            Donate now
          </button>
        </Link>
      </div>
    </section>
    
  );
};

export default HeroSection;
