"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { openCommandPalette } from "@/components/ui/CommandPalette";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navLinks, profile } from "@/data/portfolio";
import { cn, sectionHref } from "@/lib/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { useScrollToSection } from "@/lib/useScrollToSection";

const ids = navLinks.map((link) => link.id);

export function Navbar({ hasAvatar }: { hasAvatar: boolean }) {
  const pathname = usePathname();
  const active = useActiveSection(ids, pathname === "/");
  const scrollTo = useScrollToSection();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: MouseEvent) => {
    if (pathname !== "/") return; // let the link navigate home
    e.preventDefault();
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="relative w-full max-w-lg rounded-full border border-border-strong bg-bg/70 p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl md:w-auto md:max-w-none"
      >
        <div className="flex items-center justify-between gap-2 md:gap-3">
          <a
            href={sectionHref("top")}
            onClick={go("top")}
            className="flex items-center gap-2 rounded-full py-1 pr-3 pl-1"
          >
            <Avatar show={hasAvatar} size={30} />
            <span className="font-serif text-lg font-medium tracking-tight">{profile.shortName}</span>
          </a>

          <ul className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={sectionHref(link.id)}
                  onClick={go(link.id)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors lg:px-3.5 lg:py-2 lg:text-sm",
                    active === link.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {link.label}
                </a>
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-surface-2 ring-1 ring-border"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <Command size={15} />
            </button>
            <ThemeToggle />
            <ButtonLink href={profile.resume} className="ml-1 px-3.5 py-1.5 text-xs lg:px-4 lg:py-2 lg:text-sm">
              Resume <ArrowUpRight size={14} />
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-fg hover:bg-surface-2 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-3xl border border-border-strong bg-surface p-3 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={sectionHref(link.id)}
                      onClick={go(link.id)}
                      className={cn(
                        "block rounded-2xl px-4 py-3 text-base",
                        active === link.id ? "bg-surface-2 text-fg" : "text-muted",
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
                <ThemeToggle />
                <ButtonLink href={profile.resume} className="px-4 py-2">
                  Resume <ArrowUpRight size={15} />
                </ButtonLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
