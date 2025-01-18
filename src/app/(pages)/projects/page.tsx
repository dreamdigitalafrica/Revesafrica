import HeroSection from "@/components/sections/projects/hero.section";
import SuccessStoriesSection from "@/components/shared/success-stories";
import ProjectGrid from "@/components/sections/projects/project-grid.section";
import SupportUsSection from "@/components/shared/support.section";

const Projects = () => {
  return (
    <main className="w-full h-fit flex flex-col px-4 py-10 space-y-14 md:space-y-24 md:px-14">
      <HeroSection />
      <ProjectGrid />
      <SuccessStoriesSection />
      <SupportUsSection />
    </main>
  );
};

export default Projects;
