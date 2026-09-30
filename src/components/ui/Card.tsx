"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useCallback, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/site";

type Props = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode;
  lift?: boolean;
  spotlight?: boolean;
};

export function Card({
  className,
  lift = true,
  spotlight = true,
  children,
  onMouseMove,
  ...rest
}: Props) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!spotlight) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      onMouseMove?.(e);
    },
    [spotlight, onMouseMove],
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface/75 p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-border-strong hover:shadow-xl hover:shadow-accent/5",
        className,
      )}
      {...rest}
    >
      {spotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, var(--glow), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
