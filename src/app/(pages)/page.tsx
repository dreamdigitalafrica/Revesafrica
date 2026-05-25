import MainLayout from "../layout/MainLayout";
import HeroSection from "@/components/sections/home/hero.section";
// import SupportUsSection from "@/components/sections/home/support.section";
import AboutUsSection from "@/components/sections/home/about-us.section";

import ProjectsSection from "@/components/sections/home/projects.section";
import ContactUsSection from "@/components/sections/home/contact.section";
import ThermaticSection from "@/components/sections/home/thermatic.section";

export default async function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <AboutUsSection />
      <ThermaticSection />
      {/* <SupportUsSection /> */}
      <ProjectsSection />
      <ContactUsSection />
    </MainLayout>
  );
}
