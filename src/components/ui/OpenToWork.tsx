"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { hero, navLinks } from "@/data/portfolio";
import { useScrollToSection } from "@/lib/useScrollToSection";

const KEY = "open-to-work-dismissed";
const contactId = navLinks[navLinks.length - 1].id;

/** Dismissible "open to work" card; appears after 3s and stays dismissed for the session. */
export function OpenToWork() {
  const [visible, setVisible] = useState(false);
  const scrollTo = useScrollToSection();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {
      // Storage unavailable; show the card anyway.
    }
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      // Ignore; dismissal just won't persist.
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          aria-label="Availability"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed right-4 bottom-4 z-50 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-border-strong bg-surface/90 p-4 shadow-2xl backdrop-blur-md sm:right-6 sm:bottom-6"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-2.5 right-2.5 grid size-7 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
          >
            <X size={14} />
          </button>
          <p className="flex items-center gap-2 label-mono">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Open to work
          </p>
          <p className="mt-2 pr-4 text-sm text-fg/90">{hero.status}. Let&apos;s talk.</p>
          <button
            type="button"
            onClick={() => {
              scrollTo(contactId);
              dismiss();
            }}
            className="mt-3 text-sm font-medium text-accent hover:underline"
          >
            Get in touch →
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
