import Image from "next/image";
import Link from "next/link";
import { MdVerified, MdGroups } from "react-icons/md";
import { HiDownload } from "react-icons/hi";

const features = [
  {
    icon: <MdVerified size={24} className="text-[#3AF40C]" />,
    iconBg: "bg-green-50",
    title: "Impact Driven",
    description:
      "We track and measure results in education and health to ensure real growth.",
  },
  {
    icon: <MdGroups size={24} className="text-blue-500" />,
    iconBg: "bg-blue-50",
    title: "Community Focused",
    description:
      "Our projects are designed and executed alongside local leaders and families.",
  },
];

const AboutUsSection = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left — your existing images with stat overlay */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/4.5] w-full max-w-lg mx-auto shadow-sm bg-gray-100">
            <Image
              alt="About Us"
              width={1478}
              height={690}
              loading="lazy"
              quality={100}
              src="/about-us-desktop.png"
              className="hidden md:block w-full h-full object-cover"
            />
            <Image
              alt="About Us"
              width={677}
              height={316}
              src="/about-us-mobile.png"
              className="md:hidden w-full h-full object-cover"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Stat badge */}
            <div className="absolute bottom-6 left-6 bg-blue-600 text-white rounded-2xl px-6 py-4 shadow-lg">
              <p className="text-4xl font-extrabold leading-none">3+</p>
              <p className="text-sm font-medium mt-1 opacity-90">
                Years of Lasting Impact
              </p>
            </div>
          </div>
        </div>

        {/* Right — content */}
        <div className="flex flex-col gap-6">
          <p className="text-[#3AF40C] text-xs font-bold uppercase tracking-widest">
            About Our Foundation
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            About <span className="text-[#3AF40C]">Us</span>
          </h2>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Founded in November 2021, Reves is a non-governmental organisation
            (NGO) dedicated to empowering vulnerable youth and children,
            specifically those living in marginalized communities across Africa.
            We provide essential support, resources, and opportunities to youths
            to reach their full potential and become active members of their
            communities.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-6 mt-2">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.iconBg}`}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap mt-2">
            <Link
              href="/annual-report.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-6 py-4 rounded-xl hover:bg-gray-700 transition-colors"
            >
              Download Annual Report
              <HiDownload size={18} />
            </Link>
            <Link
              href="/about"
              className="font-semibold text-gray-900 underline underline-offset-4 hover:text-[#3AF40C] transition-colors"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
