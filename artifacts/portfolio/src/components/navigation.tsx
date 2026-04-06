import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-context";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="relative p-1 text-text-secondary hover:text-text-primary transition-colors"
      aria-label="Toggle theme"
    >
      <span className="relative block w-[22px] h-[22px]">
        <Sun
          size={22}
          className={cn(
            "absolute inset-0 transition-all duration-200",
            theme === "light" ? "opacity-100 rotate-0" : "opacity-0 rotate-90",
          )}
        />
        <Moon
          size={22}
          className={cn(
            "absolute inset-0 transition-all duration-200",
            theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",
          )}
        />
      </span>
    </button>
  );
}

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About",    href: "#about",    to: "/about"    },
  { label: "Contact",  href: "#contact",  to: "/contact"  },
  { label: "Resume",        href: "/resume",        to: "/resume"        },
  { label: "Work With Me", href: "/work-with-me",  to: "/work-with-me"  },
];

export function Navigation() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeHash, setActiveHash]   = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function handleNavClick(href: string) {
    setActiveHash(href);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "backdrop-blur-xl",
          scrolled
            ? "bg-background/90 border-b border-border"
            : "bg-background/70 border-b border-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* AP monogram */}
          <Link
            to="/"
            className="group relative font-heading font-bold text-lg text-[#6366F1] tracking-tight transition-colors hover:text-[#818cf8]"
          >
            AP
            <span
              className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
              style={{ background: "rgba(99,102,241,0.35)" }}
            />
          </Link>

          {/* Desktop nav links + theme toggle */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.href}
                  to={link.to}
                  className="relative text-sm font-medium transition-colors group text-text-secondary hover:text-text-primary"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] rounded-full transition-all duration-300 w-0 group-hover:w-full bg-[#6366F1]" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={cn(
                    "relative text-sm font-medium transition-colors group",
                    activeHash === link.href
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-[1.5px] rounded-full transition-all duration-300",
                      activeHash === link.href
                        ? "w-full bg-[#6366F1]"
                        : "w-0 group-hover:w-full bg-[#6366F1]",
                    )}
                  />
                </a>
              )
            )}
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              className="text-text-secondary hover:text-text-primary transition-colors p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-surface border-b border-border px-6 py-4 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.href}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-text-primary font-medium text-base transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="text-text-secondary hover:text-text-primary font-medium text-base transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
