import { BriefcaseBusiness, Settings2, ShieldCheck, Users } from "lucide-react";
import { DashboardStatCard } from "@/src/features/shared";
import { type AdminSystemStats } from "../../types/admin.types";

type AdminSettingsSnapshotCardsProps = {
  stats?: AdminSystemStats;
};

export function AdminSettingsSnapshotCards({ stats }: AdminSettingsSnapshotCardsProps) {
  const blockedUsers = Math.max(0, (stats?.totalUsers ?? 0) - (stats?.totalActiveUsers ?? 0));

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardStatCard
        icon={Users}
        title="Total user scope"
        value={String(stats?.totalUsers ?? 0)}
        note="Accounts under admin settings"
      />
      <DashboardStatCard
        icon={ShieldCheck}
        title="Active policy users"
        value={String(stats?.totalActiveUsers ?? 0)}
        note="Allowed by access policy"
      />
      <DashboardStatCard
        icon={Settings2}
        title="Blocked by policy"
        value={String(blockedUsers)}
        note="Restricted account access"
      />
      <DashboardStatCard
        icon={BriefcaseBusiness}
        title="Business tenants"
        value={String(stats?.totalBusinesses ?? 0)}
        note="Operational settings footprint"
      />
    </section>
  );
}
