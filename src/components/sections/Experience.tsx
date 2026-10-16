import { Briefcase } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <Section id="experience" index="02" label="Experience">
      <ol className="relative ml-3 border-l border-border md:ml-4">
        {experience.map((entry, i) => (
          <li key={entry.role + entry.org} className="relative pb-12 pl-8 last:pb-0 md:pl-12">
            <span className="absolute top-0.5 -left-[15px] grid size-[30px] place-items-center rounded-full border border-border-strong bg-bg text-accent shadow-xs">
              <Briefcase size={14} aria-hidden />
            </span>
            <Reveal delay={i * 0.05}>
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <h3 className="font-serif text-2xl md:text-3xl">{entry.role}</h3>
                {entry.period && <p className="shrink-0 label-mono">{entry.period}</p>}
              </div>
              <p className="mt-1 text-accent">{entry.org}</p>
              {entry.points && entry.points.length > 0 && (
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
        ))}
      </ol>
    </Section>
  );
}
