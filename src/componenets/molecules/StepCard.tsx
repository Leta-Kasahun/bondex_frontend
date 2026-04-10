import { type LucideIcon } from "lucide-react";

type StepCardProps = {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
};

export function StepCard({ index, icon: Icon, title, description }: StepCardProps) {
  return (
    <article className="relative rounded-2xl border border-border/70 bg-card p-6 shadow-card">
      <div className="absolute -top-4 left-6 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
        Step {index}
      </div>
      <div className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-heading text-xl font-semibold text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}
