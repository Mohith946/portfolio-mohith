import { profile } from "@/data/portfolio";

/** Canonical site URL: env var → Vercel production URL → portfolio.ts → localhost. */
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (!profile.siteUrl.includes("TODO")) return profile.siteUrl;
  return "http://localhost:3000";
}

/** Scroll smoothly to a section on the home page, or navigate there from other pages. */
export const sectionHref = (id: string) => `/#${id}`;

export const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");
