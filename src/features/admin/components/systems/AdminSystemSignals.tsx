import { BarChart3, Database, Server, ShieldCheck, Workflow } from "lucide-react";
import { IntegrationSyncCard } from "@/src/features/users/components/IntegrationSyncCard";
import { type AdminSystemStats } from "../../types/admin.types";

type AdminSystemSignalsProps = {
  stats?: AdminSystemStats;
};

export function AdminSystemSignals({ stats }: AdminSystemSignalsProps) {
  const leadsByPlatform = stats?.leadsByPlatform ?? [];
  const leadsByStatus = stats?.leadsByStatus ?? [];
  const dealsByStage = stats?.dealsByStage ?? [];

  const topPlatform = leadsByPlatform
    .slice()
    .sort((left, right) => right.count - left.count)[0]?.platform ?? "manual";
  const topLeadStatus = leadsByStatus
    .slice()
    .sort((left, right) => right.count - left.count)[0]?.status ?? "new";
  const topDealStage = dealsByStage
    .slice()
    .sort((left, right) => right.count - left.count)[0]?.stage ?? "qualified";

  return (
    <section className="space-y-3">
      <h2 className="font-heading text-xl font-semibold text-foreground">System operations and signals</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <IntegrationSyncCard
          icon={Server}
          title="Infrastructure"
          subtitle="Service mesh and workers"
          status="connected"
          message="Core APIs and queue workers are running with stable throughput."
        />
        <IntegrationSyncCard
          icon={Database}
          title="Data health"
          subtitle="Storage and consistency"
          status="connected"
          message={`Top inbound lead platform: ${topPlatform}. Data indexing remains healthy.`}
        />
        <IntegrationSyncCard
          icon={Workflow}
          title="Pipeline behavior"
          subtitle="Lead and deal transitions"
          status="pending"
          message={`Top lead status is ${topLeadStatus}; top deal stage is ${topDealStage}.`}
        />
        <IntegrationSyncCard
          icon={BarChart3}
          title="Business performance"
          subtitle="Revenue and closes"
          status="connected"
          message={`Closed won revenue: $${Math.round(stats?.totalRevenue ?? 0).toLocaleString("en-US")}.`}
        />
        <IntegrationSyncCard
          icon={ShieldCheck}
          title="Governance"
          subtitle="Access and control posture"
          status="connected"
          message={`${stats?.totalActiveUsers ?? 0} active users are currently under admin governance policies.`}
        />
      </div>
    </section>
  );
}
