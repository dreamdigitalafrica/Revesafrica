import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {}

const HeroSection = ({}: HeroSectionProps) => {
  return (
    <section className="h-screen bg-gray-100 hero-section">
      {/* Desktop view */}
      <div className="hidden md:flex h-full relative md:grid-cols-2">
        <div className="py-8 gap-6 md:gap-4 px-4 md:px-8 w-[68%] md:w-[46%] shrink-0 flex flex-col justify-center items-center">
          <h1 className="text-5xl lg:text-6xl mb-0 font-medium">
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

      {/* Mobile View */}
      <div className="flex h-full relative md:hidden">
        <div className="absolute w-full h-full overflow-hidden rounded-br-[2rem]">
          <Image
            src={"/hero-image.png"}
            alt="Hero image"
            height={1080}
            width={1080}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 self-end h-max  w-full">
          <h1 className="text-4xl xs:text-5xl pt-6 rounded-tr-[3rem]  mb-0 font-medium bg-[#ededed] max-w-[68%] px-4">
            Empowering vulnerable youth and children
          </h1>

          <div className="bg-[#ededed] w-full pt-4 pb-8 px-4 rounded-br-[2rem] rounded-tr-[2rem]">
            <p className="text-sm">
              Founded in November 2021, Reves is a non-governmental
              organisation(NGO) dedicated to empowering vulnerable youth and
              children, specifically those living in marginalized communities
              across Africa.
            </p>
            <Link
              className="w-max mx-auto flex"
              href="https://forms.gle/qcjw4CUr63nfwV3K9"
              target="_blank"
            >
              <button className="mt-4 px-6 text-sm whitespace-nowrap text-white py-3 font-medium bg-bluen rounded-full">
                Become a Global Champion
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
