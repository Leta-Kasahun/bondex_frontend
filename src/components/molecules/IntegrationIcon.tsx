import { type LucideIcon } from "lucide-react";

type IntegrationIconProps = {
  icon: LucideIcon;
  label: string;
};

export function IntegrationIcon({ icon: Icon, label }: IntegrationIconProps) {
  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-border/70 bg-card/70 px-4 py-3">
      <Icon className="h-4 w-4 text-primary" aria-hidden />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}
