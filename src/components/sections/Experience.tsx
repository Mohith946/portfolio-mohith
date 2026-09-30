import { Briefcase, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { education, experience } from "@/data/portfolio";

type Entry = {
  key: string;
  icon: "work" | "edu";
  title: string;
  org: string;
  meta?: string;
  points: string[];
};

const entries: Entry[] = [
  ...experience.map((e) => ({
    key: e.role + e.org,
    icon: "work" as const,
    title: e.role,
    org: e.org,
    meta: e.period,
    points: e.points,
  })),
  ...education.map((e) => ({
    key: e.degree,
    icon: "edu" as const,
    title: e.degree,
    org: e.school,
    meta: `${e.period} · ${e.score}`,
    points: [],
  })),
];

export function Experience() {
  return (
    <Section id="experience" index="02" label="Experience">
      <ol className="relative ml-3 border-l border-border md:ml-4">
        {entries.map((entry, i) => {
          const Icon = entry.icon === "work" ? Briefcase : GraduationCap;
          return (
            <li key={entry.key} className="relative pb-12 pl-8 last:pb-0 md:pl-12">
              <span className="absolute top-0.5 -left-[15px] grid size-[30px] place-items-center rounded-full border border-border-strong bg-bg text-accent">
                <Icon size={14} aria-hidden />
              </span>
              <Reveal delay={i * 0.05}>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                  <h3 className="font-serif text-2xl md:text-3xl">{entry.title}</h3>
                  {entry.meta && <p className="shrink-0 label-mono">{entry.meta}</p>}
                </div>
                <p className="mt-1 text-accent">{entry.org}</p>
                {entry.points.length > 0 && (
                  <ul className="mt-4 max-w-3xl space-y-2 text-muted">
                    {entry.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-muted"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
