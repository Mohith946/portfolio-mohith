"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <MotionConfig reducedMotion="user">
        {reduceMotion ? (
          children
        ) : (
          <ReactLenis root options={{ lerp: 0.1, anchors: false }}>
            {children}
          </ReactLenis>
        )}
      </MotionConfig>
    </ThemeProvider>
  );
}
