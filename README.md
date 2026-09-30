# Mohith L A — Portfolio

Personal portfolio built with **Next.js 16 (App Router) + TypeScript**, Tailwind CSS v4, Framer Motion,
Lenis smooth scrolling, `cmdk` command palette and `next-themes` (dark by default).

## Run locally

```bash
npm install
cp .env.example .env.local   # optional: only needed for the contact form
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command                | What it does                     |
| ---------------------- | -------------------------------- |
| `npm run build`        | Production build                 |
| `npm start`            | Serve the production build       |
| `npm run lint`         | ESLint (Next + TypeScript rules) |
| `npm run typecheck`    | TypeScript, no emit              |
| `npm run format`       | Prettier (with Tailwind sorting) |
| `npm run format:check` | Prettier check only (CI)         |

## Editing content

**All text lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).** Components only read from it.

- `profile`: name, email, links, résumé/photo paths, GitHub username, site URL
- `hero`: status pill, headline (the `accent` word is italic emerald), intro, "Now building" card,
  stat cards, "Working with" chips, marquee items
- `about`, `experience`, `education`, `projects`, `skills`, `certifications`, `contact`

Any value that starts with `TODO` is treated as a placeholder:

- **Links** (`TODO_LINKEDIN_URL`, `TODO_GITHUB_URL`, project `demo`/`github`) render as disabled
  buttons, so no dead links ship. Replace them with real URLs and they become live.
- **Case-study text** (`problem`, `approach`, `challenges`, `learnings`) shows in muted italics
  until you write it.
- **`githubUsername`**: set it (e.g. `"mohithla"`) to turn on the live GitHub stats card. Stats are
  fetched at build time and refreshed once a day (ISR). If the API call fails, the card shows
  `githubFallback` (set it to your real numbers, or leave it `null` to show just a profile link).
- **`siteUrl`**: your production domain, used for the sitemap, canonical URL and OG tags.

To add a project, append an object to `projects`. Its case study page at `/projects/<slug>` is
generated automatically. Add a `flow` array (plus an optional `humanStep`) to get the animated
architecture diagram; without one, the case study shows a diagram placeholder.

## Photos, résumé & screenshots

Everything goes in `public/`:

| File                             | Used for                                                                  |
| -------------------------------- | ------------------------------------------------------------------------- |
| `public/profile.jpg`             | Navbar avatar (square, ≥ 128×128). An "M" monogram shows until it exists. |
| `public/resume.pdf`              | "Resume ↗" / "Résumé" buttons and the command palette                     |
| `public/projects/<anything>.png` | Project screenshots (16:10 works best)                                    |

For screenshots, set `image: "/projects/smart-campus.png"` on the project in `portfolio.ts`. Without
it, a styled placeholder is shown.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable               | Required | Notes                                                                                                                                   |
| ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | For form | Create at [resend.com](https://resend.com) → API Keys. Without it the form shows a "please email me directly" message.                  |
| `CONTACT_TO_EMAIL`     | No       | Inbox for messages. Defaults to `profile.email`.                                                                                        |
| `CONTACT_FROM_EMAIL`   | No       | Default `onboarding@resend.dev` only delivers to the email on your Resend account. Verify your domain in Resend to use your own sender. |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical URL. On Vercel the production URL is picked up automatically.                                                                 |

`.env.local` is git-ignored. Never commit keys.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On [vercel.com/new](https://vercel.com/new), import the repo. No configuration is needed; the
   Next.js preset is detected automatically.
3. In **Project → Settings → Environment Variables**, add `RESEND_API_KEY` (and optionally
   the others above), then redeploy.

### Custom domain

1. **Project → Settings → Domains → Add**, and enter e.g. `mohith.dev`.
2. At your registrar, add the DNS records Vercel shows. Usually that's an `A` record for the apex
   (`76.76.21.21`) and a `CNAME` for `www` → `cname.vercel-dns.com`. Alternatively, point the
   nameservers to Vercel.
3. HTTPS is issued automatically once DNS propagates.
4. Set `siteUrl` in `portfolio.ts` (or `NEXT_PUBLIC_SITE_URL`) to the new domain so the sitemap and
   social cards use it.

## Structure

```
src/
  app/
    layout.tsx               fonts, metadata, navbar, footer, global widgets
    page.tsx                 home (ISR: revalidates daily for GitHub stats)
    projects/[slug]/page.tsx case studies (statically generated)
    actions.ts               contact form server action (Resend)
    opengraph-image.tsx      dynamic OG / Twitter image
    icon.tsx                 favicon
    sitemap.ts, robots.ts, not-found.tsx, globals.css
  components/
    sections/                Navbar, Hero, About, Experience, Projects, Skills, Contact, Footer
    ui/                      Section, SectionLabel, Card, Tag, Button, StatCard, Marquee, Reveal,
                             CommandPalette, ScrollProgress, OpenToWork, AgentFlow, ContactForm, …
    providers/               theme + Lenis + reduced-motion config
  data/portfolio.ts          ← all content
  lib/                       GitHub fetch, scroll helpers, site URL
```

## Keyboard shortcuts

- **Ctrl/⌘ + K**: command palette (jump to sections, open résumé, copy email, toggle theme, open links)
- **Tab** on first load: "Skip to content" link

Animations and smooth scrolling turn off automatically when the OS has **Reduce motion** enabled.
