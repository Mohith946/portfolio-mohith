import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AgentFlow } from "@/components/ui/AgentFlow";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Tag } from "@/components/ui/Tag";
import { isTodo, projects } from "@/data/portfolio";
import { cn } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

function Block({ index, label, children }: { index: string; label: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="py-10 md:py-14">
        <SectionLabel index={index} label={label} />
        {children}
      </section>
    </Reveal>
  );
}

function Prose({ text }: { text: string }) {
  return (
    <p
      className={cn(
        "max-w-3xl text-lg leading-relaxed",
        isTodo(text) ? "text-muted italic" : "text-fg/85",
      )}
    >
      {text}
    </p>
  );
}

export default async function CaseStudyPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const { caseStudy: cs } = project;

  return (
    <article className="mx-auto max-w-5xl px-5 pt-32 pb-16 sm:px-8 md:pt-40">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 label-mono transition-colors hover:text-accent"
      >
        <ArrowLeft size={13} /> All projects
      </Link>

      <header className="mt-8">
        <p className="label-mono text-accent">Case study</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.98] tracking-tight text-balance md:text-7xl">
          {project.title}
        </h1>
        <p className="mt-4 text-xl text-muted">{project.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <ButtonLink href={project.links.demo}>
            Live Demo <ArrowUpRight size={15} />
          </ButtonLink>
          <ButtonLink href={project.links.github} variant="outline">
            <GithubIcon width={15} height={15} /> GitHub
          </ButtonLink>
        </div>
      </header>

      <ProjectPreview project={project} priority className="mt-12 rounded-2xl" />

      <Block index="01" label="Overview">
        <Prose text={cs.overview} />
      </Block>
      <Block index="02" label="Problem">
        <Prose text={cs.problem} />
      </Block>
      <Block index="03" label="My Approach">
        <Prose text={cs.approach} />
      </Block>
      <Block index="04" label="Architecture">
        {cs.flow?.length ? (
          <AgentFlow steps={cs.flow} humanStep={cs.humanStep} />
        ) : (
          <div className="grid aspect-[16/7] place-items-center rounded-2xl border border-dashed border-border-strong bg-surface/50">
            <p className="label-mono">TODO · architecture diagram</p>
          </div>
        )}
      </Block>
      <Block index="05" label="Key Features">
        <ul className="grid gap-4 md:grid-cols-2">
          {project.highlights.map((point) => (
            <li
              key={point}
              className="rounded-2xl border border-border bg-surface/70 p-5 leading-relaxed text-fg/85"
            >
              {point}
            </li>
          ))}
        </ul>
      </Block>
      <Block index="06" label="Tech Stack">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Tag className="px-4 py-1.5 text-xs">{tech}</Tag>
            </li>
          ))}
        </ul>
      </Block>
      <Block index="07" label="Challenges & Learnings">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Challenges", cs.challenges],
            ["Learnings", cs.learnings],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-border bg-surface/70 p-6">
              <h3 className="font-serif text-2xl">{title}</h3>
              <p
                className={cn(
                  "mt-3 leading-relaxed",
                  isTodo(text) ? "text-muted italic" : "text-fg/85",
                )}
              >
                {text}
              </p>
            </div>
          ))}
        </div>
      </Block>

      <nav
        aria-label="More projects"
        className="mt-10 flex flex-wrap gap-3 border-t border-border pt-10"
      >
        {projects
          .filter((p) => p.slug !== project.slug)
          .map((p) => (
            <ButtonLink key={p.slug} href={`/projects/${p.slug}`} variant="outline">
              {p.title} →
            </ButtonLink>
          ))}
      </nav>
    </article>
  );
}
