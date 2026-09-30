import { isTodo, profile } from "@/data/portfolio";

export type GithubStats = { repos: number; followers: number; live: boolean };

/**
 * Fetches public GitHub stats at build time and revalidates once a day (ISR).
 * Falls back to the static values in portfolio.ts if the request fails.
 */
export async function getGithubStats(): Promise<GithubStats | null> {
  const fallback = profile.githubFallback ? { ...profile.githubFallback, live: false } : null;
  if (isTodo(profile.githubUsername)) return fallback;

  try {
    const res = await fetch(`https://api.github.com/users/${profile.githubUsername}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as { public_repos: number; followers: number };
    return { repos: data.public_repos, followers: data.followers, live: true };
  } catch {
    return fallback;
  }
}
