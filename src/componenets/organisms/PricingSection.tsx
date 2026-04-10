import Image from "next/image";
import { APP_ROUTES } from "@/src/constants";
import { SectionHeader } from "@/src/componenets/atoms/SectionHeader";
import { PricingCard } from "@/src/componenets/molecules/PricingCard";

const pricingTiers = [
  {
    name: "Starter",
    price: "$19/mo",
    description: "Best for small teams setting up a structured lead process.",
    features: ["Up to 3 users", "Lead pipeline board", "Basic reporting", "Email support"],
    ctaLabel: "Start Starter",
    ctaHref: APP_ROUTES.AUTH.REGISTER,
    featured: false,
  },
  {
    name: "Growth",
    price: "$59/mo",
    description: "For teams scaling outreach, qualification, and deal management.",
    features: [
      "Up to 15 users",
      "Automation workflows",
      "Advanced funnel analytics",
      "Priority support",
    ],
    ctaLabel: "Start Growth",
    ctaHref: APP_ROUTES.AUTH.REGISTER,
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored CRM operations for complex organizations.",
    features: ["Unlimited users", "Custom integrations", "Dedicated success manager", "SLA support"],
    ctaLabel: "Talk to Sales",
    ctaHref: APP_ROUTES.AUTH.REGISTER,
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 bg-accent/15">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Pricing"
          title="Plans that scale with your CRM maturity"
          description="Clear tiers so your team can start quickly and grow without replatforming."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80"
            alt="Team discussing pricing and growth plan"
            width={1400}
            height={560}
            className="h-56 w-full object-cover"
          />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </div>
    </section>
  );
}
