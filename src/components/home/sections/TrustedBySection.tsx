import Image from "next/image";
import { SectionHeader } from "@/src/components/home/sections/SectionHeader";

const brands = ["EthioTrade", "Abyssinia Logistics", "Selam Foods", "BlueNile Tech", "Habesha Retail"];

export function TrustedBySection() {
  return (
    <section className="py-14">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Trusted by teams"
          title="Sales and operations teams use Bondex daily"
          description="From inbound qualification to closed-won reporting, Bondex is the operating layer behind predictable growth."
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80"
            alt="Professionals discussing sales strategy"
            width={1400}
            height={520}
            className="h-56 w-full object-cover"
          />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {brands.map((brand) => (
            <div
              key={brand}
              className="rounded-xl border border-border/60 bg-card/70 px-4 py-3 text-center text-sm font-medium text-card-foreground shadow-card"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
