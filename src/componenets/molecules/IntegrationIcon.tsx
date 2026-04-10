import { type LucideIcon } from "lucide-react";

type IntegrationIconProps = {
  icon: LucideIcon;
  label: string;
};

export function IntegrationIcon({ icon: Icon, label }: IntegrationIconProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 shadow-card">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="text-sm font-medium text-card-foreground">{label}</span>
    </div>
  );
}
