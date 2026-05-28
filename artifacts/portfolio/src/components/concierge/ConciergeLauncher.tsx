// src/components/concierge/ConciergeLauncher.tsx

import { motion } from "framer-motion";

interface Props {
  open: boolean;
  onClick: () => void;
}

export function ConciergeLauncher({ open, onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        fixed bottom-6 right-6 z-40
        w-12 h-12 rounded-full
        bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900
        shadow-xl shadow-neutral-900/20
        flex items-center justify-center
        transition-opacity duration-300
        ${open ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
      aria-label="Ask Alan AI"
    >
      {/* Custom mark — small circle inside a larger arc */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <path
          d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.5 19 16.5 17.5 18L19 20.5C19.2 20.8 19 21.2 18.6 21.1L15.5 20.2C14.4 20.7 13.2 21 12 21C7.58172 21 4 17.4183 4 13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    </motion.button>
  );
}
