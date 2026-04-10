import Image from "next/image";
import { Bot, Sparkles, Zap } from "lucide-react";
import { SectionHeader } from "@/src/components/home/sections/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

const aiCapabilities = [
  {
    icon: Bot,
    title: "AI lead summary",
    description: "Get fast context on each incoming lead before your team takes action.",
  },
  {
    icon: Sparkles,
    title: "AI follow-up suggestions",
    description: "Draft cleaner next-step responses based on deal stage and intent signals.",
  },
  {
    icon: Zap,
    title: "AI workflow hints",
    description: "Surface smart recommendations to reduce manual sales operations overhead.",
  },
];

export function AiSection() {
  return (
    <section id="ai" className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Bondex AI"
          title="AI support built into your CRM flow"
          description="Layout preview only: AI modules can be activated later without changing your navigation structure."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80"
            alt="AI interface supporting business decisions"
            width={1400}
            height={560}
            className="h-56 w-full object-cover"
          />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {aiCapabilities.map((item) => (
            <Card key={item.title} className="border border-border/70">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2 text-lg">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
