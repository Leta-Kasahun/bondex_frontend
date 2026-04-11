import { Activity, AlertTriangle, ShieldCheck, Users } from "lucide-react";
import { BarChart3, Database, Server, Workflow } from "lucide-react";
import { DashboardStatCard, SharedSelectField } from "@/src/features/shared";
import { IntegrationSyncCard } from "@/src/features/users/components/IntegrationSyncCard";

export function AdminDashboardOverview() {
  return (
    <main className="flex-1 space-y-6 bg-background p-4 md:p-6">
      <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">System governance, performance, and platform health overview.</p>
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
        <DashboardStatCard icon={Users} title="Managed users" value="3,240" note="+4.1% from last week" />
        <DashboardStatCard icon={Activity} title="Requests/min" value="1,982" note="Stable throughput" />
        <DashboardStatCard icon={ShieldCheck} title="Security score" value="98.7%" note="No critical incidents" />
        <DashboardStatCard icon={AlertTriangle} title="Open alerts" value="3" note="2 medium, 1 low" />
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-semibold text-foreground">Operational categories and system signals</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <IntegrationSyncCard
            icon={Server}
            title="Infrastructure"
            subtitle="Core services healthy"
            status="connected"
            message="API gateways and workers are healthy with normal latency bands."
          />
          <IntegrationSyncCard
            icon={Database}
            title="Data integrity"
            subtitle="Storage and indexing"
            status="connected"
            message="Backups completed and index jobs are running on schedule."
          />
          <IntegrationSyncCard
            icon={Workflow}
            title="Automation"
            subtitle="Pipelines and jobs"
            status="pending"
            message="One low-priority scheduled task is delayed and under retry."
          />
          <IntegrationSyncCard
            icon={BarChart3}
            title="Performance"
            subtitle="Load and response"
            status="connected"
            message="Peak-hour response times remain within target thresholds."
          />
        </div>
      </section>
    </main>
  );
}
