import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {}

const HeroSection = ({}: HeroSectionProps) => {
  return (
    <section className="h-[calc(100vh-72px)] md:h-screen bg-gray-100 hero-section">
      <div className="flex h-full relative md:grid-cols-2">
        <div className="py-8 gap-6 px-4 md:px-16 w-full md:w-[45%] shrink-0 flex flex-col justify-center items-center md:pr-24">
          <h1 className="text-5xl lg:text-7xl mb-0 font-medium">
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

        <Link href="https://forms.gle/qcjw4CUr63nfwV3K9" target="_blank">
          <button className="absolute bottom-10 px-12 whitespace-nowrap text-white py-4 font-medium bg-bluen rounded-full left-[50%] translate-x-[-50%]">
            Become a Global Champion
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
