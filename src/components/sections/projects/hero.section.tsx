import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[40vh] rounded-2xl overflow-hidden bg-[#0d1117] flex items-center justify-center">
      <Image
        alt="Programs hero"
        src="/project-hero-image.svg"
        fill
        className="object-cover opacity-40"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
      <div className="relative z-10 text-center px-6 py-16 flex flex-col items-center gap-3">
        <p className="text-[#0C529C] text-xs font-bold uppercase tracking-widest">
          Our Core Programs
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-2xl">
          Empowering Communities Through Focused Programs
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
