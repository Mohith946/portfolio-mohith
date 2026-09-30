"use client";

import { Copy, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { contact, profile } from "@/data/portfolio";
import { copyEmail } from "@/lib/copyEmail";

export function Contact() {
  const { heading } = contact;

  return (
    <Section id="contact" index="05" label="Contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="font-serif text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl">
            {heading.before} <em className="text-accent">{heading.accent}</em> {heading.after}
          </p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{contact.blurb}</p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={15} /> {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="grid size-11 place-items-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Copy size={15} />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <ButtonLink href={profile.linkedin} variant="outline" className="px-4 py-2">
              <LinkedinIcon width={15} height={15} /> LinkedIn
            </ButtonLink>
            <ButtonLink href={profile.github} variant="outline" className="px-4 py-2">
              <GithubIcon width={15} height={15} /> GitHub
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card lift={false} className="p-6 md:p-8">
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
