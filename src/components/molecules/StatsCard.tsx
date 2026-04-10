type StatsCardProps = {
  value: string;
  label: string;
};

export function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/70 p-5 text-center shadow-card">
      <p className="font-heading text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
