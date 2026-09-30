import { Fragment } from "react";

export function Marquee({ items }: { items: string[] }) {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item) => (
        <Fragment key={item}>
          <li className="px-6 font-mono text-xs tracking-[0.3em] text-muted uppercase">{item}</li>
          <li aria-hidden className="size-1.5 rounded-full bg-accent" />
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div
      className="marquee relative overflow-hidden border-y border-border [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] py-5"
      aria-label="Technologies I work with"
      role="region"
    >
      <div className="marquee-track flex w-max">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
