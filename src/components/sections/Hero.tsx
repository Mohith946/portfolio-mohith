"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Marquee } from "@/components/ui/Marquee";
import { StatCard } from "@/components/ui/StatCard";
import { Tag } from "@/components/ui/Tag";
import { hero, profile } from "@/data/portfolio";
import { useScrollToSection } from "@/lib/useScrollToSection";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function LiveDot({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 label-mono text-accent">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      {label}
    </span>
  );
}

export function Hero() {
  const scrollTo = useScrollToSection();
  const { headline, intro } = hero;

  return (
    <section id="top" aria-label="Introduction" className="relative pt-32 md:pt-40">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16 lg:pb-24"
      >
        <div>
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-3.5 py-1.5 label-mono"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {hero.status}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-7 font-serif text-[3.25rem] leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl"
          >
            {headline.before} <em className="text-accent">{headline.accent}</em> {headline.after}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {intro.before} <strong className="font-medium text-fg">{intro.name}</strong>
            {intro.after}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Button onClick={() => scrollTo("projects")}>
              See my work <ArrowRight size={16} />
            </Button>
            <ButtonLink href={profile.resume} variant="outline">
              Résumé <ArrowUpRight size={16} />
            </ButtonLink>
            <div className="flex gap-2 sm:ml-2">
              <ButtonLink href={profile.linkedin} variant="icon" aria-label="LinkedIn">
                <LinkedinIcon />
              </ButtonLink>
              <ButtonLink href={profile.github} variant="icon" aria-label="GitHub">
                <GithubIcon />
              </ButtonLink>
              <Button onClick={() => scrollTo("contact")} variant="icon" aria-label="Contact">
                <Mail size={18} />
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div variants={item} className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card className="col-span-2">
            <div className="flex items-center justify-between">
              <p className="label-mono">Now building</p>
              <LiveDot label="Live" />
            </div>
            <p className="mt-5 font-serif text-3xl leading-tight">{hero.nowBuilding.title}</p>
            <p className="mt-1.5 font-mono text-xs text-muted">{hero.nowBuilding.subtitle}</p>
          </Card>
          {hero.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
          <Card className="col-span-2">
            <p className="label-mono">Working with</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {hero.workingWith.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Marquee items={hero.marquee} />
      </motion.div>
    </section>
  );
}
