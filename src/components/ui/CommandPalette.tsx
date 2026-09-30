"use client";

import { Command } from "cmdk";
import { ArrowUpRight, Copy, FileText, Hash, Moon, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { isTodo, navLinks, profile } from "@/data/portfolio";
import { copyEmail } from "@/lib/copyEmail";
import { useScrollToSection } from "@/lib/useScrollToSection";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const EVENT = "portfolio:command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(EVENT));
}

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-fg/85 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40 data-[selected=true]:bg-surface-2 data-[selected=true]:text-fg";

const groupClass =
  "[&_[cmdk-group-heading]]:label-mono [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-2";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const scrollTo = useScrollToSection();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EVENT, onOpen);
    };
  }, []);

  const run = (action: () => void) => () => {
    setOpen(false);
    action();
  };

  const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const item = (label: string, icon: ReactNode, action: () => void, disabled = false) => (
    <Command.Item
      key={label}
      value={label}
      onSelect={run(action)}
      disabled={disabled}
      className={itemClass}
    >
      <span className="text-muted">{icon}</span>
      {label}
    </Command.Item>
  );

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      overlayClassName="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
      contentClassName="fixed top-[18vh] left-1/2 z-[90] w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search size={16} className="text-muted" />
        <Command.Input
          placeholder="Type a command or search…"
          className="h-14 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
        />
        <kbd className="rounded border border-border px-1.5 py-0.5 label-mono tracking-normal">
          esc
        </kbd>
      </div>
      <Command.List data-lenis-prevent className="max-h-[50vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
          No results.
        </Command.Empty>
        <Command.Group heading="Navigate" className={groupClass}>
          {navLinks.map((link) =>
            item(`Go to ${link.label}`, <Hash size={15} />, () => scrollTo(link.id)),
          )}
        </Command.Group>
        <Command.Group heading="Actions" className={groupClass}>
          {item("Open résumé", <FileText size={15} />, () => openUrl(profile.resume))}
          {item("Copy email", <Copy size={15} />, copyEmail)}
          {item("Toggle theme", <Moon size={15} />, () =>
            setTheme(resolvedTheme === "light" ? "dark" : "light"),
          )}
        </Command.Group>
        <Command.Group heading="Links" className={groupClass}>
          {item(
            "Open GitHub",
            <GithubIcon width={15} height={15} />,
            () => openUrl(profile.github),
            isTodo(profile.github),
          )}
          {item(
            "Open LinkedIn",
            <LinkedinIcon width={15} height={15} />,
            () => openUrl(profile.linkedin),
            isTodo(profile.linkedin),
          )}
          {item("Send an email", <ArrowUpRight size={15} />, () =>
            window.location.assign(`mailto:${profile.email}`),
          )}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
