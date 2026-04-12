"use client";

import { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { AdminAnalyticsPanel } from "../analytics";
import { AdminDashboardExecutivePanel } from "../AdminDashboardExecutivePanel";
import { useAdminSystemStats } from "../../hooks";
import { type AdminAnalyticsRange } from "../../types/admin.types";
import { AdminSystemSignals } from "./AdminSystemSignals";
import { AdminSystemStatsCards } from "./AdminSystemStatsCards";

export function AdminSystemManagementPage() {
  const [range, setRange] = useState<AdminAnalyticsRange>("weekly");
  const { data: stats, isLoading, isFetching, isError } = useAdminSystemStats(range);

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <AdminDashboardExecutivePanel
        title="Bondex Admin System Overview"
        description="System-level governance, throughput, and pipeline diagnostics across the Bondex platform."
        range={range}
        onRangeChange={setRange}
        stats={stats}
      />

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
            rangeLabel={range === "today" ? "Today" : range === "monthly" ? "This Month" : "This Week"}
          />
          <AdminSystemSignals stats={stats} />
        </>
      ) : null}
    </main>
  );
}
