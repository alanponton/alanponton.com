import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-text-secondary text-sm">© 2026 Alan Ponton</p>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/alanponton"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-secondary hover:text-[#6366F1] transition-colors duration-200 p-2 rounded-md hover:bg-surface-hover"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/alan-ponton-375147187"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-secondary hover:text-[#6366F1] transition-colors duration-200 p-2 rounded-md hover:bg-surface-hover"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <p className="text-text-secondary text-xs">
          Built with React, Framer Motion &amp; Lenis
        </p>
      </div>
    </footer>
  );
}
