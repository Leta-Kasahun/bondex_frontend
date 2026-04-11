import { type LucideIcon } from "lucide-react";

type IntegrationPageIntroProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function IntegrationPageIntro({ icon: Icon, title, description }: IntegrationPageIntroProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#C3CDD6] bg-linear-to-br from-[#FFFFFF] via-[#F3F6FA] to-[#E6EEF5] p-5 shadow-sm">
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#8BAACF]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#5F82AA]/20 blur-2xl" aria-hidden />

      <div className="relative flex items-start gap-3">
        <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D5DEE7] text-[#2C4E6F]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">{title}</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </section>
  );
}
