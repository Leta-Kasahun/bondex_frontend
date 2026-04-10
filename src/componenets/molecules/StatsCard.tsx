type StatsCardProps = {
  value: string;
  label: string;
};

export function StatsCard({ value, label }: StatsCardProps) {
  return (
    <article className="rounded-2xl border border-border/70 bg-card/80 p-6 text-center shadow-card backdrop-blur-sm">
      <p className="font-heading text-3xl font-bold text-foreground">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </article>
  );
}
