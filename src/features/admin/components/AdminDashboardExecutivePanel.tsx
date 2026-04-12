import { useMemo } from "react";
import { Activity, BellRing, BriefcaseBusiness, Database, ShieldCheck, TrendingUp, Workflow } from "lucide-react";
import { SharedSelectField } from "@/src/features/shared";
import { type AdminAnalyticsRange, type AdminSystemStats } from "../types/admin.types";

type AdminDashboardExecutivePanelProps = {
  title: string;
  description: string;
  range: AdminAnalyticsRange;
  onRangeChange: (range: AdminAnalyticsRange) => void;
  stats?: AdminSystemStats;
};

const rangeOptions: Array<{ label: string; value: AdminAnalyticsRange }> = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "weekly" },
  { label: "This Month", value: "monthly" },
];

const formatCompact = (value: number): string => {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
};

export function AdminDashboardExecutivePanel({
  title,
  description,
  range,
  onRangeChange,
  stats,
}: AdminDashboardExecutivePanelProps) {
  const usersInRange = stats?.newUsersInRange ?? stats?.newUsersThisWeek ?? 0;
  const leadsInRange = stats?.newLeadsInRange ?? stats?.newLeadsThisWeek ?? 0;

  const toPulsePercent = (value: number, max: number): number => {
    return Math.max(8, Math.min(100, Math.round((value / max) * 100)));
  };

  const activityBars = useMemo(() => {
    const activeUsers = stats?.totalActiveUsers ?? 0;
    const leads = stats?.totalLeads ?? 0;
    const deals = stats?.totalDeals ?? 0;
    const revenue = Math.round(stats?.totalRevenue ?? 0);
    const max = Math.max(1, activeUsers, leads, deals, revenue);

    return [
      { label: "User control", percent: toPulsePercent(activeUsers, max) },
      { label: "Lead throughput", percent: toPulsePercent(leads, max) },
      { label: "Deal velocity", percent: toPulsePercent(deals, max) },
      { label: "Revenue pulse", percent: toPulsePercent(revenue, max) },
    ];
  }, [stats]);

  const tiles = [
    {
      label: "Users in range",
      value: formatCompact(usersInRange),
      icon: ShieldCheck,
      tone: "from-[#8BAACF] via-[#5F82AA] to-[#2C4E6F]",
    },
    {
      label: "Leads in range",
      value: formatCompact(leadsInRange),
      icon: Activity,
      tone: "from-[#8BAACF] via-[#5F82AA] to-[#2C4E6F]",
    },
    {
      label: "Deals won",
      value: formatCompact(stats?.totalWonDeals ?? 0),
      icon: Workflow,
      tone: "from-[#8BAACF] via-[#5F82AA] to-[#2C4E6F]",
    },
    {
      label: "Revenue",
      value: `$${formatCompact(Math.round(stats?.totalRevenue ?? 0))}`,
      icon: Database,
      tone: "from-[#8BAACF] via-[#5F82AA] to-[#2C4E6F]",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#8BAACF]/45 bg-linear-to-br from-[#F4F7FB] via-[#EAF0F7] to-[#DDE7F2] p-4 text-[#1F334A] shadow-lg md:p-5">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#8BAACF]/30 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-[#5F82AA]/20 blur-3xl" aria-hidden />

      <div className="relative space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-[#2C4E6F] md:text-3xl">{title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-[#4C6E95]">{description}</p>
          </div>
          <SharedSelectField
            placeholder="Filter range"
            value={range}
            options={rangeOptions}
            onValueChange={(value) => onRangeChange(value as AdminAnalyticsRange)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="space-y-3 xl:col-span-8">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {tiles.map((tile) => (
                <article key={tile.label} className="rounded-xl border border-[#8BAACF]/30 bg-white/90 p-3 shadow-sm backdrop-blur-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wide text-[#5F82AA]">{tile.label}</p>
                    <tile.icon className="h-4 w-4 text-[#5F82AA]" aria-hidden />
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <p className="text-2xl font-semibold text-[#2C4E6F]">{tile.value}</p>
                    <div className="h-2.5 w-20 rounded-full bg-[#D5DEE7]">
                      <div className={`h-2.5 rounded-full bg-linear-to-r ${tile.tone}`} style={{ width: "100%" }} />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-xl border border-[#8BAACF]/30 bg-white/95 p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#2C4E6F]">System Activity Distribution</p>
                <span className="text-xs text-[#5F82AA]">Enterprise live refresh</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  {activityBars.map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-1 flex items-center justify-between text-xs text-[#4C6E95]">
                        <span>{bar.label}</span>
                        <span>{bar.percent}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#D5DEE7]">
                        <div className="h-2 rounded-full bg-linear-to-r from-[#8BAACF] via-[#5F82AA] to-[#2C4E6F]" style={{ width: `${bar.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative h-32 w-32 rounded-full bg-conic from-[#2C4E6F] via-[#5F82AA] via-35% to-[#8BAACF]">
                    <div className="absolute inset-4 rounded-full bg-white" />
                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <div>
                        <p className="text-xs text-[#5F82AA]">Bondex</p>
                        <p className="text-sm font-semibold text-[#2C4E6F]">Admin Mix</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-xl border border-[#8BAACF]/30 bg-white/95 p-4 shadow-sm xl:col-span-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#2C4E6F]">System Pulse</p>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#8BAACF]/60 bg-[#E8EEF6] px-2 py-0.5 text-xs text-[#4C6E95]">
                <Activity className="h-3.5 w-3.5" aria-hidden />
                Live
              </span>
            </div>

            <div className="space-y-2">
              {activityBars.map((bar) => (
                <div key={bar.label} className="rounded-lg border border-[#D5DEE7] bg-[#F7FAFD] p-2.5">
                  <div className="flex items-center justify-between text-xs text-[#4C6E95]">
                    <span>{bar.label}</span>
                    <span className="font-semibold text-[#2C4E6F]">{bar.percent}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-[#D5DEE7] bg-[#F7FAFD] p-2 text-center text-[#4C6E95]">
                <BriefcaseBusiness className="mx-auto h-4 w-4" aria-hidden />
                <p className="mt-1 text-[11px]">Ops</p>
              </div>
              <div className="rounded-lg border border-[#D5DEE7] bg-[#F7FAFD] p-2 text-center text-[#4C6E95]">
                <TrendingUp className="mx-auto h-4 w-4" aria-hidden />
                <p className="mt-1 text-[11px]">Growth</p>
              </div>
              <div className="rounded-lg border border-[#D5DEE7] bg-[#F7FAFD] p-2 text-center text-[#4C6E95]">
                <BellRing className="mx-auto h-4 w-4" aria-hidden />
                <p className="mt-1 text-[11px]">Alerts</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
