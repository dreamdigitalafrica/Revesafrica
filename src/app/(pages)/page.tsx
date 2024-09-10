import ContactUsSection from "../components/sections/contact.section";
import HeroSection from "../components/sections/hero.section";
import MainLayout from "../layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <ContactUsSection />
    </MainLayout>
  );
}
