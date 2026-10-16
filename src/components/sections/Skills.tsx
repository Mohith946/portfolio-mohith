import { Award } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { certifications, skills } from "@/data/portfolio";

export function Skills() {
  return (
    <Section id="skills" index="05" label="Skills">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.06} className="h-full">
            <Card className="h-full">
              <h3 className="label-mono text-fg/80">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill}>
                    <Tag>{skill}</Tag>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>

      <SectionLabel as="h3" label="Certifications" className="mt-20" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 0.06} className="h-full">
            <Card className="flex h-full flex-col">
              <Award size={18} className="text-accent" aria-hidden />
              <p className="mt-4 leading-snug font-medium">{cert.title}</p>
              <p className="mt-auto pt-4 text-sm text-muted">
                {cert.issuer} · <span className="font-mono text-xs">{cert.date}</span>
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
