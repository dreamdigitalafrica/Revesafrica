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

      <div className="w-full h-full px-5 flex flex-col space-y-5 absolute justify-end md:space-y-7 md:justify-center md:p-14">
        <h1 className="w-56 text-3xl md:w-[47%] md:text-7xl">
          Empowering Vulnerable youth and children
        </h1>

        <p className="w-[320px] text-xs md:w-[550px] md:text-lg">
          Founded in November 2021, Reves is a non-governmental
          organisation(NGO) dedicated to empowering vulnerable youth and
          children, specifically those living in marginalized communities across
          Africa.
        </p>

        <div className="w-full flex items-center justify-center md:w-3/4">
          <a
            href="https://forms.gle/qcjw4CUr63nfwV3K9"
            className="px-7 py-3 text-base shadow-xl text-white rounded-full font-medium bg-[#0038FF] md:text-lg md:p-4"
          >
            Become a Global Champion
          </a>
        </div>
      </div>
    </aside>
  );
};

export default HeroSection;
