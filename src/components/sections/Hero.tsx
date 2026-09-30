"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  Mail,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
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
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function LiveDot({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 label-mono text-accent">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      {label}
    </span>
  );
}

const simulationSteps = [
  {
    phase: "01. Request Ingestion",
    agent: "Supervisor Agent",
    action: "NLP parsing: 'Substitute Period 3 OS Lab for Prof. Rao'",
    status: "Parsed",
  },
  {
    phase: "02. CP-SAT Constraint Engine",
    agent: "Google OR-Tools",
    action: "Evaluating 12 hard constraints (workload, lab cap, 0 clash)...",
    status: "38ms Solved",
  },
  {
    phase: "03. Human-In-The-Loop",
    agent: "LangGraph State",
    action: "Approval ticket dispatched to HOD dashboard",
    status: "Approved",
  },
  {
    phase: "04. Real-time Dispatch",
    agent: "FastAPI Engine",
    action: "Schedule committed. Push notifications broadcasted",
    status: "Complete",
  },
];

export function Hero() {
  const scrollTo = useScrollToSection();
  const { headline, intro } = hero;

  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % simulationSteps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isRunning]);

  const toggleSimulation = () => {
    setIsRunning((v) => !v);
  };

  const restartSimulation = () => {
    setActiveStep(0);
    setIsRunning(true);
  };

  return (
    <section id="top" aria-label="Introduction" className="relative pt-28 pb-12 md:pt-36">
      {/* Background radial aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(52,211,153,0.14),transparent_70%)]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1.18fr_1fr] lg:items-start lg:gap-14 lg:pb-20"
      >
        {/* Left Column: Headline & Intro */}
        <div>
          {/* Status & Timezone Badges */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/80 px-3.5 py-1.5 label-mono shadow-xs backdrop-blur-md">
              <span className="size-2 rounded-full bg-accent animate-pulse" aria-hidden />
              {hero.status}
            </span>
            {currentTime && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface-2/60 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur-md">
                <Clock size={12} className="text-accent" /> {currentTime} IST
              </span>
            )}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={item}
            className="mt-6 font-serif text-[3.25rem] leading-[0.96] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-[5rem]"
          >
            {headline.before}{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300 bg-clip-text font-serif italic text-transparent">
              {headline.accent}
            </span>{" "}
            {headline.after}
          </motion.h1>

          {/* Subtitle Bio */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {intro.before} <strong className="font-medium text-fg">{intro.name}</strong>
            {intro.after}
          </motion.p>

          {/* Call to Actions */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button onClick={() => scrollTo("projects")} className="px-5 py-3 shadow-lg shadow-accent/15">
              Explore Projects <ArrowRight size={16} />
            </Button>
            <ButtonLink href={profile.resume} variant="outline" className="px-5 py-3">
              Résumé <ArrowUpRight size={16} />
            </ButtonLink>
            <div className="flex gap-2 sm:ml-2">
              <ButtonLink href={profile.linkedin} variant="icon" aria-label="LinkedIn">
                <LinkedinIcon />
              </ButtonLink>
              <ButtonLink href={profile.github} variant="icon" aria-label="GitHub">
                <GithubIcon />
              </ButtonLink>
              <ButtonLink href={`mailto:${profile.email}`} variant="icon" aria-label="Email">
                <Mail size={18} />
              </ButtonLink>
            </div>
          </motion.div>

          {/* Highlights Chips */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-2 border-t border-border/60 pt-6 text-xs text-muted"
          >
            <span className="flex items-center gap-1.5 rounded-md bg-surface-2/60 px-2.5 py-1">
              <Zap size={13} className="text-accent" /> Multi-Agent AI
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-surface-2/60 px-2.5 py-1">
              <Cpu size={13} className="text-cyan-400" /> Constraint Optimization
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-surface-2/60 px-2.5 py-1">
              <Bot size={13} className="text-emerald-400" /> Real-time Vision
            </span>
          </motion.div>
        </div>

        {/* Right Column: High-Tech Bento Grid */}
        <motion.div variants={item} className="grid grid-cols-2 gap-3.5 sm:gap-4">
          {/* Card 1: Interactive Agent Simulation Card */}
          <Card className="col-span-2 border-border-strong/90 bg-gradient-to-b from-surface/90 to-surface/60 p-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Bot size={14} />
                </span>
                <div>
                  <p className="label-mono text-[10px]">Now Building · Flagship</p>
                  <p className="font-semibold text-fg text-sm">{hero.nowBuilding.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleSimulation}
                  aria-label={isRunning ? "Pause simulation" : "Play simulation"}
                  className="grid size-6 place-items-center rounded bg-surface-2 text-muted transition hover:text-fg"
                >
                  <Play size={10} className={isRunning ? "opacity-40" : "text-accent"} />
                </button>
                <button
                  type="button"
                  onClick={restartSimulation}
                  aria-label="Restart simulation"
                  className="grid size-6 place-items-center rounded bg-surface-2 text-muted transition hover:text-fg"
                >
                  <RotateCcw size={10} />
                </button>
                <LiveDot label="Simulation Live" />
              </div>
            </div>

            {/* Live Interactive Stepper Widget */}
            <div className="mt-3.5 space-y-2 font-mono text-xs">
              {simulationSteps.map((step, idx) => {
                const isCurrent = idx === activeStep;
                const isPast = idx < activeStep;
                return (
                  <div
                    key={step.phase}
                    className={`flex items-start justify-between rounded-xl border p-2.5 transition-all duration-300 ${
                      isCurrent
                        ? "border-accent/60 bg-accent-soft/30 shadow-[0_0_20px_rgba(52,211,153,0.12)] text-fg"
                        : isPast
                          ? "border-white/5 bg-white/[0.015] text-fg/70"
                          : "border-transparent bg-transparent text-muted/50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {isPast ? (
                          <CheckCircle2 size={13} className="text-accent" />
                        ) : isCurrent ? (
                          <span className="relative flex size-3">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                            <span className="relative inline-flex size-3 rounded-full bg-accent" />
                          </span>
                        ) : (
                          <span className="inline-block size-3 rounded-full border border-white/20" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[11px]">{step.agent}</p>
                        <p className="text-[10px] text-muted">{step.action}</p>
                      </div>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] ${
                        isCurrent
                          ? "bg-accent text-accent-fg font-bold"
                          : "bg-surface-2 text-muted"
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between pt-1 text-[10px] text-muted font-mono">
              <span>LangGraph · OR-Tools CP-SAT · FastAPI</span>
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="text-accent hover:underline flex items-center gap-1"
              >
                Inspect Case Study <ArrowRight size={10} />
              </button>
            </div>
          </Card>

          {/* Stat 1 */}
          <Card className="flex flex-col justify-between p-4 sm:p-5">
            <div>
              <p className="label-mono text-[10px]">Projects</p>
              <p className="mt-2 font-serif text-4xl leading-none text-fg sm:text-5xl">3</p>
            </div>
            <p className="mt-3 text-xs text-muted">AI & Full-Stack Platforms</p>
          </Card>

          {/* Stat 2 */}
          <Card className="flex flex-col justify-between p-4 sm:p-5">
            <div>
              <p className="label-mono text-[10px]">Academic</p>
              <p className="mt-2 font-serif text-4xl leading-none text-fg sm:text-5xl">8.17</p>
            </div>
            <p className="mt-3 text-xs text-muted">CGPA · NMAMIT CSE</p>
          </Card>

          {/* Working With Card */}
          <Card className="col-span-2 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <p className="label-mono text-[10px]">Core Stack & Tools</p>
              <span className="font-mono text-[10px] text-accent">Production Ready</span>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {hero.workingWith.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </motion.div>

      {/* Scrolling Tech Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-4"
      >
        <Marquee items={hero.marquee} />
      </motion.div>
    </section>
  );
}
