import { Flame } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

type LeadStatsCardsProps = {
  stats: {
    total: number;
    pending: number;
    highPriority: number;
    converted: number;
  };
};

export function LeadStatsCards({ stats }: LeadStatsCardsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader className="pb-2">
          <CardDescription>Total leads</CardDescription>
          <CardTitle className="text-2xl">{stats.total}</CardTitle>
        </CardHeader>
      </Card>

      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader className="pb-2">
          <CardDescription>Pending action</CardDescription>
          <CardTitle className="text-2xl">{stats.pending}</CardTitle>
        </CardHeader>
      </Card>

      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader className="pb-2">
          <CardDescription>High priority</CardDescription>
          <CardTitle className="inline-flex items-center gap-2 text-2xl">
            <Flame className="h-5 w-5 text-[#B91C1C]" aria-hidden />
            {stats.highPriority}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader className="pb-2">
          <CardDescription>Converted</CardDescription>
          <CardTitle className="text-2xl">{stats.converted}</CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}
