import Image from "next/image";
import { SectionHeader } from "@/src/components/home/sections/SectionHeader";
import { TestimonialCard } from "@/src/components/molecules/TestimonialCard";

const testimonials = [
  {
    quote:
      "Bondex helped our team stop guessing. We now qualify faster, follow up consistently, and close with better visibility.",
    author: "Rahel Bekele",
    role: "Sales Operations Lead, EthioTrade",
  },
  {
    quote:
      "Our pipeline review meetings are now data-driven. Every stage has context, owner accountability, and next actions.",
    author: "Samuel Tadesse",
    role: "Commercial Manager, BlueNile Tech",
  },
  {
    quote:
      "Implementation was quick, and the workflow aligns with how our CRM team already works. Adoption was immediate.",
    author: "Marta Gebru",
    role: "Head of Growth, Selam Foods",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Customer voices"
          title="Trusted by teams that prioritize revenue clarity"
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
            alt="Happy team discussing growth outcomes"
            width={1400}
            height={560}
            className="h-56 w-full object-cover"
          />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.author} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
