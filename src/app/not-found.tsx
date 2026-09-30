import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-start justify-center px-5 pt-32 pb-16 sm:px-8">
      <p className="label-mono text-accent">Error 404</p>
      <h1 className="mt-5 font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl">
        This page is <em className="text-accent">lost</em>.
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">
        The link may be broken, or the page may have moved. Let&apos;s get you back on track.
      </p>
      <ButtonLink href="/" className="mt-10">
        <ArrowLeft size={16} /> Back home
      </ButtonLink>
    </section>
  );
}
