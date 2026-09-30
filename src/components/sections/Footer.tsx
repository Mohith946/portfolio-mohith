"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";
import { useScrollToSection } from "@/lib/useScrollToSection";

export function Footer({ lastUpdated }: { lastUpdated: string }) {
  const scrollTo = useScrollToSection();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          © {profile.copyrightYear} {profile.name} · Built with Next.js
        </p>
        <p className="label-mono">Last updated {lastUpdated}</p>
        <button
          type="button"
          onClick={() => scrollTo("top")}
          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 label-mono transition-colors hover:border-accent hover:text-accent"
        >
          Back to top <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
}
