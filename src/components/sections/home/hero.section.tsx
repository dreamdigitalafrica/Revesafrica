import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="hero !px-0 relative">
      <>
        <Image
          width={698}
          height={645}
          alt="hero-image"
          src={"/hero-image.png"}
          className="hidden md:block"
        />
        <Image
          width={1080}
          height={1086}
          alt="hero-image"
          className="md:hidden h-full pb-8 object-cover w-full"
          src={"/hero-image-mobile.png"}
        />
      </>

      <div className="w-full h-full flex px-4 flex-col space-y-4 md:pl-14 md:mr-4 -mb-8 md:mb-0 absolute justify-end bottom-0 md:space-y-7 md:justify-center ">
        <h1 className="max-w-60 md:max-w-none md:bg-transparent overflow-hidden w-max md:pt-0 font-semibold text-2xl md:w-[47%] md:text-7xl">
          Empowering Africa’s Marginalized Youth to Thrive
        </h1>

        <p className="w-full text-sm max-w-60 line-clamp-6 md:line-clamp-none h-max overflow-hidden md:max-w-lg md:pb-0 md:text-lg">
          Founded in 2021, Rêves Foundation exists to uplift children and youth
          in underserved African communities. Through education, mentorship, and
          empowerment programs, we help them break barriers, build confidence,
          and become the leaders of tomorrow.
        </p>

        <div className="w-full flex items-center md:justify-start justify-center  md:w-3/4">
          <a
            href="https://forms.gle/qcjw4CUr63nfwV3K9"
            className="px-7 py-3 text-base shadow-xl drop-shadow-md  text-white rounded-full font-semibold bg-[#0038FF] md:text-lg md:px-8 md:py-4"
          >
            Become a Global Champion
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
