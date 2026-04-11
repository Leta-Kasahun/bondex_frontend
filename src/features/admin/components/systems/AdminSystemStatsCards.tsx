import { Activity, BarChart3, BriefcaseBusiness, DollarSign, Workflow } from "lucide-react";
import { DashboardStatCard } from "@/src/features/shared";
import { type AdminSystemStats } from "../../types/admin.types";

type AdminSystemStatsCardsProps = {
  stats?: AdminSystemStats;
};

const formatRevenue = (value: number): string => {
  if (!value) {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export function AdminSystemStatsCards({ stats }: AdminSystemStatsCardsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <DashboardStatCard
        icon={BriefcaseBusiness}
        title="Total businesses"
        value={String(stats?.totalBusinesses ?? 0)}
        note="Managed across tenants"
      />
      <DashboardStatCard
        icon={BarChart3}
        title="Total leads"
        value={String(stats?.totalLeads ?? 0)}
        note={`${stats?.newLeadsThisWeek ?? 0} added this week`}
      />
      <DashboardStatCard
        icon={Workflow}
        title="Deals in pipeline"
        value={String(stats?.totalDeals ?? 0)}
        note={`${stats?.totalWonDeals ?? 0} won deals`}
      />
      <DashboardStatCard
        icon={DollarSign}
        title="Won revenue"
        value={formatRevenue(stats?.totalRevenue ?? 0)}
        note="Enterprise sales performance"
      />
      <DashboardStatCard
        icon={Activity}
        title="Active users"
        value={String(stats?.totalActiveUsers ?? 0)}
        note={`${stats?.totalUsers ?? 0} total users`}
      />
    </section>
  );
}
