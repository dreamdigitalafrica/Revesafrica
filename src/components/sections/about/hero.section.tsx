import Image from "next/image";

const HeroSection = () => {
  return (
    <aside className="w-full container flex flex-col items-center justify-center space-y-10">
      <div className="w-full flex flex-col space-y-2 md:space-y-0 md:relative">
        <Image
          alt=""
          width={677}
          quality={100}
          loading="lazy"
          height={316.06}
          src={"/images/about-us-page-bg.jpeg"}
          className="w-full shadow-lg md:hidden"
        />

        <Image
          alt=""
          width={1478}
          height={690}
          quality={100}
          loading="lazy"
          src={"/about-hero-image.png"}
          className="w-full hidden md:block"
        />

        <h3 className="flex space-x-3 text-3xl md:absolute md:flex-col md:right-16 md:bottom-16 md:space-y-1 md:space-x-0 md:text-7xl font-extrabold">
          <span>About</span>
          <span className="text-[#F7901E]">Us</span>
        </h3>
      </div>

      <p className="w-full text-base md:text-lg">
        Founded in November 2021, <span className="font-medium">Reves</span> is
        a non-governmental organisation(NGO)  dedicated to empowering vulnerable
        youth and children, specifically those living in marginalised
        communities across Africa. We provide essential support, resources, and
        opportunities to youths to reach their full potential and become active
        member of their communities.
      </p>
    </aside>
  );
};

export default HeroSection;
