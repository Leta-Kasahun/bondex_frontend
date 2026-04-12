import { Activity, BadgeCheck, Link2, Users } from "lucide-react";
import { MessageCircle, Mail, Webhook, PenSquare } from "lucide-react";
import { DashboardStatCard } from "@/src/features/shared";
import { useUserStats } from "../hooks";
import { IntegrationSyncCard } from "./IntegrationSyncCard";
import { UserDashboardAnalytics } from "./UserDashboardAnalytics";
import { UserDashboardExecutiveHero } from "./UserDashboardExecutiveHero";

export function UserDashboardOverview() {
  const { data: stats } = useUserStats();

  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <UserDashboardExecutiveHero />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard icon={Users} title="Active leads" value={String(stats?.leads ?? 0)} note="Leads currently in Bondex pipeline" />
        <DashboardStatCard icon={Link2} title="Connected channels" value="4" note="Telegram, Gmail, Webhook, Manual" />
        <DashboardStatCard icon={Activity} title="Deals in motion" value={String(stats?.deals ?? 0)} note="Live deal progression across states" />
        <DashboardStatCard icon={BadgeCheck} title="Priority watch" value={String(stats?.highPriorityLeads ?? 0)} note="High-priority leads requiring action" />
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-semibold text-foreground">Integration categories and sync messages</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <IntegrationSyncCard
            icon={MessageCircle}
            title="Telegram"
            subtitle="Bot webhook connected"
            status="connected"
            message="Sync queue healthy. Last message synced 2 min ago."
          />
          <IntegrationSyncCard
            icon={Mail}
            title="Gmail"
            subtitle="Mailbox connector active"
            status="connected"
            message="Inbound threads synchronized with response tracking."
          />
          <IntegrationSyncCard
            icon={Webhook}
            title="Webhooks"
            subtitle="Endpoint mapping"
            status="pending"
            message="One endpoint needs signature refresh to continue sync."
          />
          <IntegrationSyncCard
            icon={PenSquare}
            title="Manual direct"
            subtitle="Direct change logs"
            status="connected"
            message="Manual updates are synced and reflected in pipeline states."
          />
        </div>
      </section>

      <UserDashboardAnalytics />
    </main>
  );
}
