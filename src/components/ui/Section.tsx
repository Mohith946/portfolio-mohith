import type { ReactNode } from "react";
import { cn } from "@/lib/site";
import { SectionLabel } from "./SectionLabel";

type Props = {
  id: string;
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, label, children, className }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className={cn("mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 md:py-28", className)}
    >
      <SectionLabel id={`${id}-label`} index={index} label={label} />
      {children}
    </section>
  );
}
