import Image from "next/image";
import { StatsCard } from "@/src/componenets/molecules/StatsCard";

const stats = [
  { value: "12K+", label: "Leads processed monthly" },
  { value: "38%", label: "Average response-time improvement" },
  { value: "27%", label: "Pipeline conversion increase" },
  { value: "99.9%", label: "Platform uptime" },
];

export function StatsSection() {
  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mb-8 overflow-hidden rounded-2xl border border-border/60 shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
            alt="Business metrics and KPI charts"
            width={1400}
            height={560}
            className="h-56 w-full object-cover"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <StatsCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
