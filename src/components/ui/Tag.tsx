import type { ReactNode } from "react";
import { cn } from "@/lib/site";

export function Tag({
  children,
  className,
  active,
}: {
  children: ReactNode;
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[11px] tracking-wide transition-all duration-200",
        active
          ? "border-accent/40 bg-accent-soft text-accent shadow-xs"
          : "border-border/80 bg-surface-2/70 text-fg/80 hover:border-accent/40 hover:bg-surface-2 hover:text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}
