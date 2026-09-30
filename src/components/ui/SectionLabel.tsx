import { cn } from "@/lib/site";

type Props = { index?: string; label: string; id?: string; className?: string; as?: "h2" | "h3" };

export function SectionLabel({ index, label, id, className, as: Tag = "h2" }: Props) {
  return (
    <Tag id={id} className={cn("mb-10 flex items-center gap-3 label-mono", className)}>
      {index && <span className="text-accent">{index}</span>}
      {index && <span aria-hidden>—</span>}
      <span>{label}</span>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </Tag>
  );
}
