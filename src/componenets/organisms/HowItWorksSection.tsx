import Image from "next/image";
import { Database, Handshake, Settings2 } from "lucide-react";
import { SectionHeader } from "@/src/componenets/atoms/SectionHeader";
import { StepCard } from "@/src/componenets/molecules/StepCard";

const steps = [
  {
    index: 1,
    icon: Database,
    title: "Capture and centralize leads",
    description: "Bring leads from forms, referrals, and outreach into a single, standardized intake flow.",
  },
  {
    index: 2,
    icon: Settings2,
    title: "Qualify and automate follow-ups",
    description: "Apply your team logic for assignment, scoring, and nurture steps based on lead context.",
  },
  {
    index: 3,
    icon: Handshake,
    title: "Move opportunities to close",
    description: "Use clear stages, activity history, and forecasting data to improve win rates over time.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="How it works"
          title="A simple workflow your team can adopt quickly"
          description="Each step maps directly to standard CRM operations so onboarding is fast and execution stays consistent."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80"
            alt="Team planning structured CRM workflow"
            width={1400}
            height={560}
            className="h-56 w-full object-cover"
          />
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.title} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
