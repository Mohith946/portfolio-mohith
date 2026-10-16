"use client";

import Image from "next/image";
import { Activity, Bot, Code2, Cpu, Database, Eye, Globe, Layers, Layout, Lock, QrCode, Sparkles, Wifi } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/site";

export function ProjectPreview({
  project,
  className,
  priority,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface-2",
          className,
        )}
      >
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  // Render bespoke interactive UI previews tailored to each project's engineering domain:
  if (project.slug === "smart-campus-agent-system") {
    return (
      <div
        className={cn(
          "relative flex aspect-[16/10] flex-col overflow-hidden rounded-xl border border-border-strong/70 bg-[#090b14] p-4 text-xs select-none sm:p-5",
          className,
        )}
      >
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/80" />
            <span className="size-2.5 rounded-full bg-amber-500/80" />
            <span className="size-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[10px] text-muted">langgraph_supervisor.py</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] text-accent">
            <Sparkles size={11} /> CP-SAT Solved · 0 Clashes
          </span>
        </div>

        {/* Timetable & Agent Matrix Preview */}
        <div className="mt-3 grid grid-cols-3 gap-2 font-mono">
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
            <span className="text-[10px] text-muted">Hard Constraints</span>
            <p className="mt-1 font-serif text-lg text-fg">12 / 12</p>
            <span className="text-[9px] text-accent">✓ All Satisfied</span>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
            <span className="text-[10px] text-muted">Solver Latency</span>
            <p className="mt-1 font-serif text-lg text-fg">38 ms</p>
            <span className="text-[9px] text-muted">Google OR-Tools</span>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
            <span className="text-[10px] text-muted">HITL Workflow</span>
            <p className="mt-1 font-serif text-lg text-fg">HOD Approved</p>
            <span className="text-[9px] text-accent">LangGraph State</span>
          </div>
        </div>

        {/* Dynamic Schedule Grid visualization */}
        <div className="mt-3 flex-1 rounded-lg border border-white/5 bg-black/40 p-2.5 font-mono">
          <div className="flex items-center justify-between text-[10px] text-muted">
            <span>Period Slot</span>
            <span>Assigned Faculty</span>
            <span>Room</span>
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between rounded bg-accent-soft/40 px-2 py-1 text-[11px] text-accent">
              <span className="font-semibold">CS302 · OS Lab</span>
              <span>Dr. Rao → Prof. Bhat (Substituted)</span>
              <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[9px]">Lab 402</span>
            </div>
            <div className="flex items-center justify-between rounded bg-white/[0.03] px-2 py-1 text-[11px] text-fg/80">
              <span>CS305 · AI & ML</span>
              <span>Prof. Sandeep</span>
              <span className="text-[9px] text-muted">LH 201</span>
            </div>
            <div className="flex items-center justify-between rounded bg-white/[0.03] px-2 py-1 text-[11px] text-fg/80">
              <span>CS308 · DBMS</span>
              <span>Dr. Ananya</span>
              <span className="text-[9px] text-muted">LH 104</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.slug === "ai-surveillance-dashboard") {
    return (
      <div
        className={cn(
          "relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-xl border border-border-strong/70 bg-[#070810] p-4 font-mono text-xs select-none sm:p-5",
          className,
        )}
      >
        {/* HUD Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-fg tracking-wide">CAM_04 · MAIN_GATE</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-muted">
            <span className="flex items-center gap-1 text-accent">
              <Wifi size={11} /> 8ms WS
            </span>
            <span>60.2 FPS</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-white">YOLOv8x</span>
          </div>
        </div>

        {/* Viewport Simulation with Bounding Boxes */}
        <div className="relative my-2 flex-1 rounded-lg border border-dashed border-white/15 bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.08),transparent_70%)] p-3">
          {/* Target 1 Box */}
          <div className="absolute top-4 left-6 rounded border border-accent bg-accent/10 px-2 py-1 text-[10px] text-accent shadow-[0_0_12px_rgba(129,140,248,0.35)]">
            <div className="flex items-center gap-1 font-bold">
              <Eye size={10} /> Person · 98.4%
            </div>
            <span className="text-[8px] text-white/70">bbox [142, 88, 210, 340]</span>
          </div>

          {/* Target 2 Box */}
          <div className="absolute right-8 bottom-4 rounded border border-cyan-400 bg-cyan-400/10 px-2 py-1 text-[10px] text-cyan-300">
            <div className="flex items-center gap-1 font-bold">
              <Activity size={10} /> Vehicle (Sedan) · 94.7%
            </div>
            <span className="text-[8px] text-white/70">speed ~ 24 km/h</span>
          </div>

          <div className="absolute bottom-2 left-2 text-[9px] text-muted">
            OpenCV Stream Active · Stream Buffer: 0 drops
          </div>
        </div>

        {/* Bottom Ticker */}
        <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-muted">
          <span>Objects Tracked: 6</span>
          <span className="text-accent">Telemetry: Streaming to React Client</span>
        </div>
      </div>
    );
  }

  if (project.slug === "police-theft-management-system") {
    return (
      <div
        className={cn(
          "relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-xl border border-border-strong/70 bg-[#0a0d18] p-4 font-mono text-xs select-none sm:p-5",
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Lock size={12} className="text-accent" />
            <span className="font-semibold text-fg text-[11px]">INCIDENT DISPATCH #8492</span>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
            JWT Auth · RBAC
          </span>
        </div>

        {/* Incident Info & Geospatial Matcher */}
        <div className="my-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
            <div className="flex items-center gap-1 text-[10px] text-muted">
              <QrCode size={12} className="text-accent" /> Property Verification
            </div>
            <p className="mt-1 text-[11px] font-medium text-fg">QR Verified Tag #KL-882</p>
            <p className="mt-0.5 text-[9px] text-accent">Status: Recovered & Logged</p>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
            <div className="flex items-center gap-1 text-[10px] text-muted">
              <Database size={12} className="text-cyan-400" /> Proximity Engine
            </div>
            <p className="mt-1 text-[11px] font-medium text-fg">Geospatial Radius: 2.5 km</p>
            <p className="mt-0.5 text-[9px] text-cyan-300">Match Confidence: 91.2%</p>
          </div>
        </div>

        {/* MongoDB + Express Pipeline */}
        <div className="rounded-lg border border-white/5 bg-black/40 p-2 text-[10px]">
          <div className="flex items-center justify-between text-muted">
            <span>MERN Stack Architecture</span>
            <span className="text-accent">REST Endpoints Active</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.slug === "liquid-glass-portfolio") {
    return (
      <div
        className={cn(
          "relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-xl border border-border-strong/70 bg-[#080b12] p-4 font-mono text-xs select-none sm:p-5",
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Globe size={12} className="text-accent" />
            <span className="font-semibold text-fg text-[11px]">MOHITHLA.VERCEL.APP</span>
          </div>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] text-accent">
            React 19 · Vite
          </span>
        </div>

        {/* Liquid Glass Preview Window */}
        <div className="relative my-2 flex-1 rounded-xl border border-white/10 bg-white/[0.03] p-3 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between text-[10px] text-muted">
            <span className="flex items-center gap-1.5 text-accent">
              <Layers size={11} /> Glassmorphic UI
            </span>
            <span>Vite HMR</span>
          </div>

          <div className="mt-2.5 space-y-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.05] p-2 backdrop-blur-md">
              <p className="text-[11px] font-medium text-fg">Fluid Mesh Gradients</p>
              <p className="mt-0.5 text-[9px] text-accent">GPU Accelerated · 60 FPS</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/30 px-2 py-1 text-[10px] text-muted">
              <span>Tailwind v4 PostCSS</span>
              <span className="text-accent">Live Production</span>
            </div>
          </div>
        </div>

        {/* Footer Ticker */}
        <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-muted">
          <span>Client SPA Architecture</span>
          <span className="text-accent">Vercel Edge Deployed</span>
        </div>
      </div>
    );
  }

  if (project.slug === "modernist-developer-portfolio") {
    return (
      <div
        className={cn(
          "relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-xl border border-border-strong/70 bg-[#070912] p-4 font-mono text-xs select-none sm:p-5",
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Layout size={12} className="text-accent" />
            <span className="font-semibold text-fg text-[11px]">PORTFOLIO-MOHITH (v2)</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] text-accent">
            <Sparkles size={10} /> Next.js 16 · Turbopack
          </span>
        </div>

        {/* Architecture Grid */}
        <div className="my-2 grid grid-cols-2 gap-2 text-[10px]">
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
            <span className="text-muted flex items-center gap-1">
              <Code2 size={11} className="text-accent" /> Typeface
            </span>
            <p className="mt-1 font-serif text-[13px] text-fg">Bodoni Moda</p>
            <span className="text-[9px] text-accent">Didone Contrast</span>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
            <span className="text-muted flex items-center gap-1">
              <Activity size={11} className="text-accent" /> Smooth Engine
            </span>
            <p className="mt-1 font-mono text-[11px] text-fg">Lenis + Framer</p>
            <span className="text-[9px] text-accent">Spring Physics</span>
          </div>
        </div>

        {/* Footer Ticker */}
        <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-muted">
          <span>ISR 24h · ⌘K Palette</span>
          <span className="text-accent">App Router Full-Stack</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface-2",
        className,
      )}
    >
      <div className="absolute inset-0 grid place-items-center [background-image:radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_60%),linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] [background-size:auto,24px_24px,24px_24px]">
        <div className="text-center">
          <p className="font-serif text-2xl text-fg/80 italic md:text-3xl">{project.title}</p>
          <p className="mt-2 label-mono">{project.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
