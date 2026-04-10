import Link from "next/link";
import { Button } from "@/src/components/ui/button";
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

export function PricingCard({ name, price, description, features, ctaLabel, ctaHref, featured }: PricingCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card/75 p-6 shadow-card",
        featured ? "border-primary/40" : ""
      )}
    >
      <h3 className="font-heading text-xl font-semibold text-foreground">{name}</h3>
      <p className="mt-1 text-2xl font-bold text-foreground">{price}</p>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {features.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
      <Button asChild className="mt-6 w-full" variant={featured ? "default" : "outline"}>
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
