"use client";

import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const NAV_OFFSET = -88;

/** Smoothly scrolls to a section on the home page, or navigates there from any other page. */
export function useScrollToSection() {
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (id: string) => {
      if (id === "top") {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0 });
        if (pathname === "/") history.replaceState(null, "", "/");
        return;
      }
      if (pathname !== "/") {
        router.push(`/#${id}`);
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: NAV_OFFSET });
      else target.scrollIntoView();
      history.replaceState(null, "", `#${id}`);
    },
    [lenis, pathname, router],
  );
}
