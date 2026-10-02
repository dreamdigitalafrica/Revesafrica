import SupportUsSection from "@/components/sections/home/support.section";

import HeroSection from "@/components/sections/about/hero.section";
import CertificationSection from "@/components/sections/about/certification.section";
import VisionMissionSection from "@/components/sections/about/vision-mission.section";

import TimelineSection from "@/components/sections/about/timeline.section";

const About = () => {
  return (
    <main className="reves-original-about-page w-full h-fit flex flex-col px-4 py-10 space-y-10 md:space-y-20 md:px-14">
      <HeroSection />
      <VisionMissionSection />
      <TimelineSection />
      <CertificationSection />
      <SupportUsSection />
    </main>
  );
};

export default About;
