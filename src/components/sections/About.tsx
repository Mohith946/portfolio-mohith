import { MapPin } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { about, isTodo, profile } from "@/data/portfolio";
import { getGithubStats } from "@/lib/github";

export async function About() {
  const stats = await getGithubStats();
  const handle = isTodo(profile.githubUsername) ? null : `@${profile.githubUsername}`;

  return (
    <Section id="about" index="01" label="About">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <Reveal className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-serif text-3xl leading-snug text-fg/95 md:text-4xl"
                  : "text-lg leading-relaxed text-muted"
              }
            >
              {p}
            </p>
          ))}
          <p className="flex items-center gap-2 label-mono">
            <MapPin size={13} className="text-accent" /> {profile.location}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <p className="label-mono">GitHub</p>
              <GithubIcon className="text-muted" />
            </div>
            {handle && <p className="mt-4 font-mono text-sm">{handle}</p>}
            {stats ? (
              <dl className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <dt className="label-mono">Public repos</dt>
                  <dd className="mt-2 font-serif text-5xl leading-none">{stats.repos}</dd>
                </div>
                <div>
                  <dt className="label-mono">Followers</dt>
                  <dd className="mt-2 font-serif text-5xl leading-none">{stats.followers}</dd>
                </div>
              </dl>
            ) : (
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Code, experiments and project source live on my GitHub.
              </p>
            )}
            <div className="mt-auto pt-8">
              <ButtonLink href={profile.github} variant="outline" className="w-full">
                View profile
              </ButtonLink>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
