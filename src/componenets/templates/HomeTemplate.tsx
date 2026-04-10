import { AiSection } from "@/src/componenets/organisms/AiSection";
import { CtaSection } from "@/src/componenets/organisms/CtaSection";
import { FaqSection } from "@/src/componenets/organisms/FaqSection";
import { FeaturesSection } from "@/src/componenets/organisms/FeaturesSection";
import { Footer } from "@/src/componenets/organisms/Footer";
import { HeroSection } from "@/src/componenets/organisms/HeroSection";
import { HowItWorksSection } from "@/src/componenets/organisms/HowItWorksSection";
import { IntegrationsSection } from "@/src/componenets/organisms/IntegrationsSection";
import { Navbar } from "@/src/componenets/organisms/Navbar";
import { PricingSection } from "@/src/componenets/organisms/PricingSection";
import { SampleBusinessesSection } from "@/src/componenets/organisms/SampleBusinessesSection";
import { StatsSection } from "@/src/componenets/organisms/StatsSection";
import { TestimonialsSection } from "@/src/componenets/organisms/TestimonialsSection";
import { TrustedBySection } from "@/src/componenets/organisms/TrustedBySection";

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
      <Footer />
    </div>
  );
}
