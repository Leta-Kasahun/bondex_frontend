import Link from "next/link";
import { ArrowRight, Shield, SlidersHorizontal, Workflow } from "lucide-react";
import { APP_ROUTES } from "@/src/constants";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { IntegrationSyncCard } from "@/src/features/users/components/IntegrationSyncCard";
import { type AdminSystemStats } from "../../types/admin.types";

type AdminSettingsGovernancePanelProps = {
  stats?: AdminSystemStats;
};

export function AdminSettingsGovernancePanel({ stats }: AdminSettingsGovernancePanelProps) {
  const topLeadStatus =
    stats?.leadsByStatus
      ?.slice()
      .sort((left, right) => right.count - left.count)[0]?.status ?? "new";

  const topDealStage =
    stats?.dealsByStage
      ?.slice()
      .sort((left, right) => right.count - left.count)[0]?.stage ?? "qualified";

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div className="space-y-4 xl:col-span-2">
        <IntegrationSyncCard
          icon={Shield}
          title="Access governance"
          subtitle="Role and account policy"
          status="connected"
          message="Admin access controls are enforced by backend auth and role middleware."
        />
        <IntegrationSyncCard
          icon={Workflow}
          title="Pipeline defaults"
          subtitle="Lead and deal state posture"
          status="connected"
          message={`Current dominant statuses: leads=${topLeadStatus}, deals=${topDealStage}.`}
        />
        <IntegrationSyncCard
          icon={SlidersHorizontal}
          title="Operational policy"
          subtitle="Tenant and workflow alignment"
          status="pending"
          message="Review user and security modules for policy-level adjustments and enforcement actions."
        />
      </div>

      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader>
          <CardTitle>Settings actions</CardTitle>
          <CardDescription>Navigate to focused admin modules for enforcement and operations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button asChild variant="outline" className="w-full justify-between">
            <Link href={APP_ROUTES.DASHBOARD.ADMIN.USERS}>
              Open user management
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-between">
            <Link href={APP_ROUTES.DASHBOARD.ADMIN.SECURITY}>
              Open security controls
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-between">
            <Link href={APP_ROUTES.DASHBOARD.ADMIN.SYSTEM}>
              Open system center
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
