import Image from "next/image";

const HeroSection = () => {
  return (
    <aside className="hero relative">
      <>
        <Image
          width={698}
          height={645}
          alt="hero-image"
          src={"/hero-image.png"}
          className="hidden md:block"
        />
        <Image
          width={370}
          height={606}
          alt="hero-image"
          className="md:hidden"
          src={"/hero-image-mobile.png"}
        />
      </>

      <div className="w-full h-full px-5 flex flex-col space-y-5 absolute  justify-end md:space-y-7 md:justify-center md:px-14 pt-24">
        <h1 className="max-w-72 md:max-w-none bg-gray-100 md:bg-transparent overflow-hidden w-max rounded-tr-3xl pt-14 md:pt-0 font-semibold text-3xl md:w-[47%] md:text-7xl">
          Empowering Vulnerable youth and children
        </h1>

        <p className="w-[320px] text-xs md:w-[550px] pb-8 md:pb-0 md:text-lg">
          Founded in November 2021, Reves is a non-governmental
          organisation(NGO) dedicated to empowering vulnerable youth and
          children
          <span className="hidden md:inline">
            , specifically those living in marginalized communities across
            Africa
          </span>
          .
        </p>

        <div className="w-full flex items-center justify-center md:w-3/4">
          <a
            href="https://forms.gle/qcjw4CUr63nfwV3K9"
            className="px-7 py-3 text-base shadow-xl drop-shadow-md text-white rounded-full font-semibold bg-[#0038FF] md:text-lg md:px-8 md:py-4"
          >
            Become a Global Champion
          </a>
        </div>
      </div>
    </aside>
  );
};

export default HeroSection;
