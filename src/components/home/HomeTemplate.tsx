import { Footer } from "@/src/components/layouts/Footer";
import { Navbar } from "@/src/components/layouts/Navbar";
import { AiSection } from "@/src/components/home/sections/AiSection";
import { CtaSection } from "@/src/components/home/sections/CtaSection";
import { FaqSection } from "@/src/components/home/sections/FaqSection";
import { FeaturesSection } from "@/src/components/home/sections/FeaturesSection";
import { HeroSection } from "@/src/components/home/sections/HeroSection";
import { HowItWorksSection } from "@/src/components/home/sections/HowItWorksSection";
import { IntegrationsSection } from "@/src/components/home/sections/IntegrationsSection";
import { PricingSection } from "@/src/components/home/sections/PricingSection";
import { SampleBusinessesSection } from "@/src/components/home/sections/SampleBusinessesSection";
import { StatsSection } from "@/src/components/home/sections/StatsSection";
import { TestimonialsSection } from "@/src/components/home/sections/TestimonialsSection";
import { TrustedBySection } from "@/src/components/home/sections/TrustedBySection";
import { PublicAiWidget } from "@/src/features/public/components";

export function HomeTemplate() {
  return (
    <div className="min-h-screen scroll-smooth bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <SampleBusinessesSection />
        <TrustedBySection />
        <FeaturesSection />
        <AiSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <IntegrationsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <PublicAiWidget />
      <Footer />
    </div>
  );
}
