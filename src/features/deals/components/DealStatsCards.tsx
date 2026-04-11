import { Activity, CircleDollarSign, Target, Trophy } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

type DealStatsCardsProps = {
  stats: {
    total: number;
    active: number;
    won: number;
    pipelineValue: number;
  };
};

export function DealStatsCards({ stats }: DealStatsCardsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader className="pb-2">
          <CardDescription className="inline-flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" aria-hidden /> Total deals
          </CardDescription>
          <CardTitle className="text-2xl">{stats.total}</CardTitle>
        </CardHeader>
      </Card>

      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader className="pb-2">
          <CardDescription className="inline-flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" aria-hidden /> Active deals
          </CardDescription>
          <CardTitle className="text-2xl">{stats.active}</CardTitle>
        </CardHeader>
      </Card>

      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader className="pb-2">
          <CardDescription className="inline-flex items-center gap-2">
            <Trophy className="h-4 w-4 text-[#166534]" aria-hidden /> Won deals
          </CardDescription>
          <CardTitle className="text-2xl">{stats.won}</CardTitle>
        </CardHeader>
      </Card>

      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader className="pb-2">
          <CardDescription className="inline-flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-primary" aria-hidden /> Pipeline value
          </CardDescription>
          <CardTitle className="text-2xl">${stats.pipelineValue.toLocaleString()}</CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}
