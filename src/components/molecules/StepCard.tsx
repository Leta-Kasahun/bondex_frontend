import { type LucideIcon } from "lucide-react";

type StepCardProps = {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
};

export function StepCard({ index, icon: Icon, title, description }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-card">
      <div className="inline-flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {index}
        </span>
        <Icon className="h-4 w-4 text-primary" aria-hidden />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
