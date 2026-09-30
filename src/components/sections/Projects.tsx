import { ArrowUpRight, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { projects, type Project } from "@/data/portfolio";
import { cn } from "@/lib/site";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const featured = project.featured;

  return (
    <Card
      lift={!featured}
      className={cn(
        "group flex flex-col gap-6 p-4 sm:p-5",
        featured &&
          "lg:col-span-2 lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-10 lg:p-6",
      )}
    >
      <ProjectPreview project={project} />
      <div className="flex flex-1 flex-col px-1 pb-1">
        <p className="flex items-center gap-3 label-mono">
          <span>{String(index + 1).padStart(2, "0")}</span>
          {featured && (
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">Featured</span>
          )}
        </p>
        <h3
          className={cn(
            "mt-3 font-serif leading-tight",
            featured ? "text-4xl md:text-5xl" : "text-3xl",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-accent">{project.subtitle}</p>
        <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-7">
          <ButtonLink href={`/projects/${project.slug}`} className="px-4 py-2">
            <BookOpen size={15} /> Case Study
          </ButtonLink>
          <ButtonLink href={project.links.demo} variant="outline" className="px-4 py-2">
            Live Demo <ArrowUpRight size={15} />
          </ButtonLink>
          <ButtonLink href={project.links.github} variant="outline" className="px-4 py-2">
            <GithubIcon width={15} height={15} /> GitHub
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}

export function Projects() {
  const ordered = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <Section id="projects" index="03" label="Projects">
      <div className="grid gap-5 lg:grid-cols-2">
        {ordered.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={i * 0.05}
            className={cn(project.featured && "lg:col-span-2")}
          >
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
