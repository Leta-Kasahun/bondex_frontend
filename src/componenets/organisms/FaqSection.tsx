import Image from "next/image";
import { SectionHeader } from "@/src/componenets/atoms/SectionHeader";
import { FaqItem } from "@/src/componenets/molecules/FaqItem";
import { Accordion } from "@/src/componenets/ui/accordion";

const faqItems = [
  {
    question: "Can Bondex support our existing CRM workflow?",
    answer:
      "Yes. Bondex is structured around standard lead lifecycle stages, so teams can map existing qualification and deal processes with minimal friction.",
  },
  {
    question: "Do you provide automation for follow-ups?",
    answer:
      "Yes. You can configure automated reminders, assignments, and sequence actions based on lead status and activity signals.",
  },
  {
    question: "Is Bondex suitable for distributed teams?",
    answer:
      "Absolutely. Shared timelines, centralized pipeline views, and alerting help remote or multi-office teams stay coordinated.",
  },
  {
    question: "How long does onboarding usually take?",
    answer:
      "Most teams can launch a working pipeline and import initial leads in under one week, depending on data readiness and process complexity.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-16">
      <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions teams ask before switching"
          description="Clear answers so you can evaluate Bondex confidently."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80"
            alt="Business consultation and planning conversation"
            width={1400}
            height={560}
            className="h-56 w-full object-cover"
          />
        </div>
        <Accordion type="single" collapsible className="mt-8 space-y-3">
          {faqItems.map((item) => (
            <FaqItem key={item.question} value={item.question} {...item} />
          ))}
        </Accordion>
      </div>
    </section>
  );
}
