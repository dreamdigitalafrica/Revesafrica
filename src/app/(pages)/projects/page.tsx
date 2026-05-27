import HeroSection from "@/components/sections/projects/hero.section";
import ProjectGrid from "@/components/sections/projects/project-grid.section";
import CTASection from "@/components/sections/home/cta.section";

const Projects = () => {
  return (
    <main className="w-full flex flex-col gap-16 px-4 py-10 md:px-8 md:py-12 max-w-6xl mx-auto">
      <HeroSection />
      <ProjectGrid />
      <CTASection />
    </main>
  );
};

export default Projects;
