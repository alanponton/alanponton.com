import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#2A2A2E] bg-[#0A0A0B] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#8E8E93] text-sm">
          © 2026 Alan Ponton
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#8E8E93] hover:text-[#F5F5F7] transition-colors p-1.5 rounded-md hover:bg-[#1C1C1F]"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#8E8E93] hover:text-[#F5F5F7] transition-colors p-1.5 rounded-md hover:bg-[#1C1C1F]"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <p className="text-[#8E8E93] text-xs">
          Built with React, Framer Motion & Lenis
        </p>
      </div>
    </footer>
  );
}
