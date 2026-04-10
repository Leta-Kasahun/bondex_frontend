import Image from "next/image";
import { Globe, Mail, MessageCircle, Webhook } from "lucide-react";
import { SectionHeader } from "@/src/componenets/atoms/SectionHeader";
import { IntegrationIcon } from "@/src/componenets/molecules/IntegrationIcon";

const integrations = [
  { icon: MessageCircle, label: "Telegram" },
  { icon: Mail, label: "Gmail" },
  { icon: Webhook, label: "Webhooks" },
  { icon: Globe, label: "Public Lead Forms" },
];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Integrations"
          title="Connect the channels your team already uses"
          description="Plug Bondex into your communication stack to keep lead context complete and actionable."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
            alt="Connected communication tools for sales teams"
            width={1400}
            height={560}
            className="h-56 w-full object-cover"
          />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((item) => (
            <IntegrationIcon key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
