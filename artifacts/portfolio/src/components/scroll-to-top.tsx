import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
