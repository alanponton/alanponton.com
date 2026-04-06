import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { SecondaryProjects } from "@/components/sections/secondary-projects";
import { ContactTeaser } from "@/components/sections/contact-teaser";

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <AboutTeaser />
      <SecondaryProjects />
      <ContactTeaser />
    </main>
  );
}
