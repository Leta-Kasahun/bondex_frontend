import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/componenets/ui/button";
import { cn } from "@/src/utils/cn";

type PricingCardProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

export function PricingCard({
  name,
  price,
  description,
  features,
  ctaLabel,
  ctaHref,
  featured = false,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border p-6 shadow-card transition-all",
        featured
          ? "border-primary/40 bg-primary/[0.06] shadow-card-hover"
          : "border-border/70 bg-card"
      )}
    >
      <h3 className="font-heading text-2xl font-semibold text-card-foreground">{name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <p className="mt-5 font-heading text-4xl font-bold text-foreground">{price}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button asChild className="mt-6 w-full">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </article>
  );
}
