import { Card } from "./Card";

type Props = { label: string; value: string; subtitle: string };

export function StatCard({ label, value, subtitle }: Props) {
  return (
    <Card>
      <p className="label-mono">{label}</p>
      <p className="mt-4 font-serif text-5xl leading-none text-fg md:text-6xl">{value}</p>
      <p className="mt-2 text-sm text-muted">{subtitle}</p>
    </Card>
  );
}
