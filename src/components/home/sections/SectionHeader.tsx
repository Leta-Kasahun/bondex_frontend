import { cn } from "@/src/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">{description}</p> : null}
    </div>
  );
}
