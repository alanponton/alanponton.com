import { SmoothScroll } from "@/components/smooth-scroll";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { SecondaryProjects } from "@/components/sections/secondary-projects";
import { ContactTeaser } from "@/components/sections/contact-teaser";

export default function App() {
  return (
    <SmoothScroll>
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutTeaser />
        <SecondaryProjects />
        <ContactTeaser />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
