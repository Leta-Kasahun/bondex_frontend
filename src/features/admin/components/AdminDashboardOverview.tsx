"use client";

import { useState } from "react";
import { Activity, BarChart3, Database, Server, ShieldCheck, Workflow } from "lucide-react";
import { DashboardStatCard } from "@/src/features/shared";
import { useAdminSystemStats } from "../hooks";
import { AdminAnalyticsPanel } from "./analytics";
import { AdminDashboardExecutivePanel } from "./AdminDashboardExecutivePanel";
import { IntegrationSyncCard } from "@/src/features/users/components/IntegrationSyncCard";
import { type AdminAnalyticsRange } from "../types/admin.types";

export function AdminDashboardOverview() {
  const [range, setRange] = useState<AdminAnalyticsRange>("weekly");
  const { data: stats } = useAdminSystemStats(range);
  const newUsersInRange = stats?.newUsersInRange ?? stats?.newUsersThisWeek ?? 0;
  const newLeadsInRange = stats?.newLeadsInRange ?? stats?.newLeadsThisWeek ?? 0;

  const leadsByPlatform = stats?.leadsByPlatform ?? [];
  const dealsByStage = stats?.dealsByStage ?? [];
  const topPlatform = leadsByPlatform
    .slice()
    .sort((left, right) => right.count - left.count)[0]?.platform ?? "manual";
  const topDealStage = dealsByStage
    .slice()
    .sort((left, right) => right.count - left.count)[0]?.stage ?? "qualified";

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <AdminDashboardExecutivePanel
        title="Bondex Admin Dashboard Overview"
        description="Unified admin view for governance, system health, and pipeline intelligence across Bondex."
        range={range}
        onRangeChange={setRange}
        stats={stats}
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard
          icon={Activity}
          title="Total users"
          value={String(stats?.totalUsers ?? 0)}
          note={`${newUsersInRange} new in selected range`}
        />
        <DashboardStatCard
          icon={ShieldCheck}
          title="Active users"
          value={String(stats?.totalActiveUsers ?? 0)}
          note="User access under control"
        />
        <DashboardStatCard
          icon={BarChart3}
          title="Leads tracked"
          value={String(stats?.totalLeads ?? 0)}
          note={`${newLeadsInRange} new in selected range`}
        />
        <DashboardStatCard
          icon={Workflow}
          title="Deals in pipeline"
          value={String(stats?.totalDeals ?? 0)}
          note={`${stats?.totalWonDeals ?? 0} won`}
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-semibold text-foreground">Operational categories and system signals</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <IntegrationSyncCard
            icon={Server}
            title="Infrastructure"
            subtitle="Core services healthy"
            status="connected"
            message="API gateways and workers are available with consistent response patterns."
          />
          <IntegrationSyncCard
            icon={Database}
            title="Data integrity"
            subtitle="Storage and indexing"
            status="connected"
            message={`Top lead source currently: ${topPlatform}. Data indexing is consistent.`}
          />
          <IntegrationSyncCard
            icon={Workflow}
            title="Automation"
            subtitle="Pipelines and jobs"
            status="pending"
            message={`Most frequent deal stage is ${topDealStage}, guiding pipeline optimization.`}
          />
          <IntegrationSyncCard
            icon={BarChart3}
            title="Performance"
            subtitle="Load and response"
            status="connected"
            message={`Current won revenue is $${Math.round(stats?.totalRevenue ?? 0).toLocaleString("en-US")}.`}
          />
        </div>
      </section>

      <AdminAnalyticsPanel
        title="Enterprise analytics"
        description="Cross-platform funnel analytics powered by backend admin aggregations and selected timeframe."
        stats={stats}
        rangeLabel={range === "today" ? "Today" : range === "monthly" ? "This Month" : "This Week"}
      />
    </main>
  );
}
