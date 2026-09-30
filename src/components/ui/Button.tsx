import Link from "next/link";
import type { ComponentProps } from "react";
import { isTodo } from "@/data/portfolio";
import { cn } from "@/lib/site";

type Variant = "primary" | "outline" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent px-5 py-2.5 text-accent-fg hover:brightness-110 hover:shadow-[0_0_24px_var(--glow)]",
  outline: "border border-border-strong px-5 py-2.5 text-fg hover:border-fg/40 hover:bg-surface-2",
  icon: "size-11 border border-border-strong text-fg hover:border-accent hover:text-accent",
};

const buttonClass = (variant: Variant, className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.97]",
    variants[variant],
    className,
  );

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...rest} />;
}

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string; variant?: Variant };

/**
 * A pill-shaped link. External URLs and PDFs open in a new tab.
 * If the href is still a TODO placeholder it renders disabled, so no dead link ships.
 */
export function ButtonLink({ href, variant = "primary", className, ...rest }: ButtonLinkProps) {
  const classes = buttonClass(variant, className);

  if (isTodo(href)) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title="Link coming soon"
        aria-label={rest["aria-label"]}
        className={cn(classes, "cursor-not-allowed opacity-45 active:scale-100")}
      >
        {rest.children}
      </span>
    );
  }

  if (href.startsWith("mailto:")) return <a href={href} className={classes} {...rest} />;

  if (/^https?:/.test(href) || href.endsWith(".pdf")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest} />
    );
  }

  return <Link href={href} className={classes} {...rest} />;
}
