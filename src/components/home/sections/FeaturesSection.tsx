import Image from "next/image";
import { BellRing, Bot, ChartNoAxesCombined, ClipboardCheck, Filter, MessageSquareMore } from "lucide-react";
import { SectionHeader } from "@/src/components/home/sections/SectionHeader";
import { FeatureCard } from "@/src/components/molecules/FeatureCard";

const features = [
  {
    icon: Filter,
    title: "Smart lead qualification",
    description: "Automatically score and segment leads using behavior, source, and buying intent rules.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Pipeline visibility",
    description: "Track movement across stages with conversion insights by owner, source, and deal size.",
  },
  {
    icon: MessageSquareMore,
    title: "Unified conversations",
    description: "Manage web, email, and chat interactions in one timeline for faster context switching.",
  },
  {
    icon: Bot,
    title: "Automation workflows",
    description: "Trigger reminders, enrichment, and follow-ups so no qualified opportunity gets dropped.",
  },
  {
    icon: BellRing,
    title: "Real-time alerts",
    description: "Notify teams about hot leads, stalled deals, and SLA risks with rule-based notifications.",
  },
  {
    icon: ClipboardCheck,
    title: "Revenue-ready reporting",
    description: "Generate executive-ready snapshots for weekly reviews and forecasting meetings.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-white/35">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Core capabilities"
          title="Everything your CRM process needs in one system"
          description="Purpose-built modules designed to support your qualification, nurturing, and deal closing flow."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
            alt="CRM analytics dashboard on laptop"
            width={1400}
            height={600}
            className="h-64 w-full object-cover"
          />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
