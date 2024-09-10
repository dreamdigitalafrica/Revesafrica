import ContactUsSection from "../components/sections/contact.section";
import HeroSection from "../components/sections/hero.section";
import ProjectsSection from "../components/sections/projects.section";
import SupportUsSection from "../components/sections/support.section";
import ThermaticSection from "../components/sections/thermatic.section";
import MainLayout from "../layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ThermaticSection />
      <SupportUsSection />
      <ProjectsSection />
      <ContactUsSection />
    </MainLayout>
  );
}
