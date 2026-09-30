"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/site";

/** Animated pipeline diagram: steps light up in sequence with a pulse travelling between them. */
export function AgentFlow({ steps, humanStep }: { steps: string[]; humanStep?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % steps.length), 1300);
    return () => clearInterval(timer);
  }, [inView, reduceMotion, steps.length]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Workflow: ${steps.join(" → ")}`}
      className="rounded-2xl border border-border bg-surface/70 p-6 md:p-8"
    >
      <ol className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
        {steps.map((step, i) => {
          const isActive = !reduceMotion && i === active;
          const done = reduceMotion || i < active;
          const human = step === humanStep;
          return (
            <li key={step} className="flex flex-col items-center lg:flex-1 lg:flex-row">
              <motion.div
                animate={{ scale: isActive ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "w-full rounded-xl border px-3 py-3 text-center transition-colors duration-500 lg:min-h-[5.5rem] lg:content-center",
                  isActive
                    ? "border-accent bg-accent-soft text-fg shadow-[0_0_30px_var(--glow)]"
                    : done
                      ? "border-border-strong text-fg/90"
                      : "border-border text-muted",
                  human && "border-dashed",
                )}
              >
                <span className="block label-mono text-[10px]">
                  {String(i + 1).padStart(2, "0")}
                  {human && " · human"}
                </span>
                <span className="mt-1 block text-sm leading-snug font-medium">{step}</span>
              </motion.div>
              {i < steps.length - 1 && <Connector lit={!reduceMotion && i === active} />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Connector({ lit }: { lit: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 12"
      className="h-6 w-10 shrink-0 rotate-90 text-border-strong lg:h-3 lg:w-8 lg:rotate-0"
    >
      <line
        x1="2"
        y1="6"
        x2="34"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <path d="M32 2 L38 6 L32 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {lit && (
        <motion.circle
          r="2.5"
          cy="6"
          className="fill-accent"
          initial={{ cx: 2, opacity: 0 }}
          animate={{ cx: 34, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}
