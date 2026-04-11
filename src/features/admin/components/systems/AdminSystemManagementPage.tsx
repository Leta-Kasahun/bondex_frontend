"use client";

import { useState } from "react";
import { ServerCog } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { SharedSelectField } from "@/src/features/shared";
import { AdminAnalyticsPanel } from "../analytics";
import { useAdminSystemStats } from "../../hooks";
import { type AdminAnalyticsRange } from "../../types/admin.types";
import { AdminSystemSignals } from "./AdminSystemSignals";
import { AdminSystemStatsCards } from "./AdminSystemStatsCards";

const rangeOptions: Array<{ label: string; value: AdminAnalyticsRange }> = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "weekly" },
  { label: "This Month", value: "monthly" },
];

export function AdminSystemManagementPage() {
  const [range, setRange] = useState<AdminAnalyticsRange>("weekly");
  const { data: stats, isLoading, isFetching, isError } = useAdminSystemStats(range);

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <section className="relative overflow-hidden rounded-2xl border border-[#C3CDD6] bg-linear-to-br from-[#FFFFFF] via-[#F3F6FA] to-[#E6EEF5] p-5 shadow-sm">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#8BAACF]/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#5F82AA]/20 blur-2xl" aria-hidden />

        <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="inline-flex items-center gap-2 font-heading text-2xl font-semibold text-foreground md:text-3xl">
              <ServerCog className="h-6 w-6 text-primary" aria-hidden />
              Admin System Center
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Track platform health, pipeline behavior, and enterprise operating metrics from one system panel.
            </p>
          </div>
          <SharedSelectField
            placeholder="Filter range"
            value={range}
            options={rangeOptions}
            onValueChange={(value) => setRange(value as AdminAnalyticsRange)}
          />
        </div>
      </section>

      {isLoading || isFetching ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Loading system telemetry...</CardContent>
        </Card>
      ) : null}

      {isError ? (
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load system data right now.</CardContent>
        </Card>
      ) : null}

      {!isLoading && !isError ? (
        <>
          <AdminSystemStatsCards stats={stats} />
          <AdminAnalyticsPanel
            title="System analytics"
            description="Operational funnel and pipeline insights for platform-wide system management across selected timeframe."
            stats={stats}
            rangeLabel={rangeOptions.find((option) => option.value === range)?.label ?? "This Week"}
          />
          <AdminSystemSignals stats={stats} />
        </>
      ) : null}
    </main>
  );
}
