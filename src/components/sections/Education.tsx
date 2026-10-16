import { GraduationCap, Award } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { education } from "@/data/portfolio";

export function Education() {
  const btechCoursework = [
    "Data Structures & Algorithms",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "OOP in Java & C++",
    "Software Engineering",
  ];

  return (
    <Section id="education" index="03" label="Education">
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, i) => (
          <Reveal key={edu.degree} delay={i * 0.08} className="h-full">
            <Card className="flex h-full flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-accent shadow-xs">
                    <GraduationCap size={20} aria-hidden />
                  </span>
                  <span className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1 font-mono text-xs font-semibold text-accent">
                    {edu.score}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="font-serif text-2xl leading-tight text-fg sm:text-3xl">
                    {edu.degree}
                  </h3>
                  <p className="mt-1.5 text-base font-medium text-accent">{edu.school}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{edu.period}</p>
                </div>

                {edu.degree.includes("B.Tech") && (
                  <div className="mt-6 border-t border-border/60 pt-5">
                    <p className="label-mono text-[10px] text-muted">Key Coursework & Fundamentals</p>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Coursework">
                      {btechCoursework.map((course) => (
                        <li key={course}>
                          <Tag>{course}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {edu.degree.includes("B.Tech") && (
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-muted/80">
                  <Award size={13} className="text-accent" />
                  <span>Ranked consistently among top performers in department</span>
                </div>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
