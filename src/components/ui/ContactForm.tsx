"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/actions";
import { cn } from "@/lib/site";
import { Button } from "./Button";

const initial: ContactState = { status: "idle", message: "" };

const fieldClass =
  "w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus-visible:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block label-mono">Name</span>
          <input name="name" required maxLength={100} autoComplete="name" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-2 block label-mono">Email</span>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block label-mono">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className={cn(fieldClass, "resize-y")}
        />
      </label>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending} className="disabled:opacity-60">
          {pending ? <Loader2 size={16} className="animate-spin" /> : null}
          {pending ? "Sending…" : "Send message"}
          {!pending && <ArrowRight size={16} />}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={cn("text-sm", state.status === "error" ? "text-red-400" : "text-accent")}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
