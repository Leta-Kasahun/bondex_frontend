import { Activity, BadgeCheck, Link2, Users } from "lucide-react";
import { MessageCircle, Mail, Webhook, PenSquare } from "lucide-react";
import { DashboardStatCard, SharedSelectField } from "@/src/features/shared";
import { IntegrationSyncCard } from "./IntegrationSyncCard";
import { UserDashboardAnalytics } from "./UserDashboardAnalytics";

export function UserDashboardOverview() {
  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">User Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Overview of integrations, sync status, and account activity.</p>
        </div>
        <SharedSelectField
          placeholder="Filter range"
          value="weekly"
          options={[
            { label: "Today", value: "today" },
            { label: "This Week", value: "weekly" },
            { label: "This Month", value: "monthly" },
          ]}
          onValueChange={() => {}}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard icon={Users} title="Active leads" value="1,284" note="+12.5% from last week" />
        <DashboardStatCard icon={Link2} title="Connected channels" value="4" note="Telegram, Gmail, Webhooks, Manual" />
        <DashboardStatCard icon={Activity} title="Sync events" value="892" note="Last 24 hours" />
        <DashboardStatCard icon={BadgeCheck} title="Healthy status" value="99.2%" note="No critical sync failures" />
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
