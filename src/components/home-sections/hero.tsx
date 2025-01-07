import { inter } from "@/app/layout";
import Image from "next/image";

const Hero = () => {
  return (
    <aside className={`hero ${inter.className} relative`}>
      <Image
        alt=""
        height={645}
        width={698}
        className="hidden md:block"
        src={"/hero-image.png"}
      />
      <Image
        alt=""
        width={360}
        height={606}
        className="md:hidden"
        src={"/hero-image-mobile.png"}
      />

      <div className="w-full h-full px-5 pt-10 flex flex-col space-y-7 absolute justify-end md:justify-center md:p-14">
        <h1 className="w-52 pt-10 text-3xl md:w-[47%] md:text-7xl">
          Empowering Vulnerable youth and children
        </h1>

        <p className="w-[320px] text-sm md:w-[600px] md:text-lg">
          Founded in November 2021, Reves is a non-governmental
          organisation(NGO) dedicated to empowering vulnerable youth and
          children, specifically those living in marginalized communities across
          Africa.
        </p>

        <div className="w-full flex items-center justify-center md:w-3/4">
          <button className="px-7 py-3 text-base text-white rounded-full font-medium bg-[#0038FF] md:text-lg md:p-4">
            Become a Global Champion
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Hero;
