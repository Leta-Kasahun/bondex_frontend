import { Lock, ShieldAlert, ShieldCheck, UserCheck } from "lucide-react";
import { DashboardStatCard } from "@/src/features/shared";
import { type AdminSystemStats, type AdminUser } from "../../types/admin.types";

type AdminSecurityStatsCardsProps = {
  stats?: AdminSystemStats;
  users: AdminUser[];
};

export function AdminSecurityStatsCards({ stats, users }: AdminSecurityStatsCardsProps) {
  const blockedUsers = Math.max(0, (stats?.totalUsers ?? 0) - (stats?.totalActiveUsers ?? 0));
  const usersWithNoDeals = users.filter((user) => user.totalLeads > 0 && user.totalDeals === 0).length;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardStatCard
        icon={ShieldCheck}
        title="Active accounts"
        value={String(stats?.totalActiveUsers ?? 0)}
        note="Users allowed to access platform"
      />
      <DashboardStatCard
        icon={Lock}
        title="Blocked accounts"
        value={String(blockedUsers)}
        note="Revoked from login access"
      />
      <DashboardStatCard
        icon={ShieldAlert}
        title="Security watch"
        value={String(usersWithNoDeals)}
        note="Users with leads but no deals"
      />
      <DashboardStatCard
        icon={UserCheck}
        title="Total users"
        value={String(stats?.totalUsers ?? 0)}
        note="Admin security scope"
      />
    </section>
  );
}
