import { Activity, BriefcaseBusiness, DollarSign, Handshake, Users } from "lucide-react";
import { DashboardStatCard } from "@/src/features/shared";
import { type AdminSystemStats } from "../../types/admin.types";

type AdminUserStatsCardsProps = {
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

export function AdminUserStatsCards({ stats }: AdminUserStatsCardsProps) {
  const newUsersInRange = stats?.newUsersInRange ?? stats?.newUsersThisWeek ?? 0;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <DashboardStatCard
        icon={Users}
        title="Total users"
        value={String(stats?.totalUsers ?? 0)}
        note={`${newUsersInRange} added in selected range`}
      />
      <DashboardStatCard
        icon={Activity}
        title="Active users"
        value={String(stats?.totalActiveUsers ?? 0)}
        note="Ready to engage"
      />
      <DashboardStatCard
        icon={BriefcaseBusiness}
        title="Business workspaces"
        value={String(stats?.totalBusinesses ?? 0)}
        note="Across all accounts"
      />
      <DashboardStatCard
        icon={Handshake}
        title="Won deals"
        value={String(stats?.totalWonDeals ?? 0)}
        note={`${stats?.totalDeals ?? 0} total deals`}
      />
      <DashboardStatCard
        icon={DollarSign}
        title="Total revenue"
        value={formatRevenue(stats?.totalRevenue ?? 0)}
        note="Closed won value"
      />
    </section>
  );
}
