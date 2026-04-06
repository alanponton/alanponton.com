import { Route, Switch } from "wouter";
import { ThemeProvider } from "@/context/theme-context";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CustomCursor } from "@/components/custom-cursor";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HomePage } from "@/components/pages/home-page";
import { CaseStudyPage } from "@/components/pages/case-study-page";
import { AboutPage } from "@/components/pages/about-page";
import { ContactPage } from "@/components/pages/contact-page";
import { ResumePage } from "@/components/pages/resume-page";
import { WorkWithMePage } from "@/components/pages/work-with-me-page";

function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-mono text-[#6366F1] text-xs uppercase tracking-widest mb-4">404</p>
        <h1 className="font-heading text-4xl font-bold text-[#F5F5F7] mb-4">Page not found</h1>
        <a href="/" className="text-[#8E8E93] hover:text-[#6366F1] transition-colors text-sm">
          ← Back to home
        </a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navigation />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/projects/:slug" component={CaseStudyPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/resume" component={ResumePage} />
        <Route path="/work-with-me" component={WorkWithMePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </SmoothScroll>
    </ThemeProvider>
  );
}
