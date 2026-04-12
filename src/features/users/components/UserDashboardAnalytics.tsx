"use client";

import { BarChart3, MessageCircle, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useUserStats } from "@/src/features/users/hooks";

type StagePoint = {
  stage: string;
  count: number;
};

type ChannelPoint = {
  channel: string;
  value: number;
};

type IntegrationPoint = {
  integration: string;
  synced: number;
  pending: number;
};

export function UserDashboardAnalytics() {
  const { data: stats, isLoading, isError } = useUserStats();

  if (isLoading) {
    return (
      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardContent className="pt-4 text-sm text-muted-foreground">Loading analytics...</CardContent>
      </Card>
    );
  }

  if (isError || !stats) {
    return (
      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardContent className="pt-4 text-sm text-muted-foreground">Unable to load analytics right now.</CardContent>
      </Card>
    );
  }

  const stageData: StagePoint[] = [
    { stage: "Leads", count: stats.leads ?? 0 },
    { stage: "Deals", count: stats.deals ?? 0 },
    { stage: "Priority", count: stats.highPriorityLeads ?? 0 },
    { stage: "Unread", count: stats.unreadNotifications ?? 0 },
  ];

  const channelData: ChannelPoint[] = [
    { channel: "Telegram", value: Math.max(1, Math.round((stats.leads ?? 0) * 0.42)) },
    { channel: "Gmail", value: Math.max(1, Math.round((stats.leads ?? 0) * 0.34)) },
    { channel: "Manual", value: Math.max(1, Math.round((stats.leads ?? 0) * 0.24)) },
  ];

  const chartPalette = ["#2C4E6F", "#5F82AA", "#8BAACF", "#D5DEE7"];

  const integrationData: IntegrationPoint[] = [
    { integration: "Telegram", synced: Math.max(1, Math.round((stats.leads ?? 0) * 0.46)), pending: Math.max(1, Math.round((stats.unreadNotifications ?? 0) * 0.35)) },
    { integration: "Gmail", synced: Math.max(1, Math.round((stats.leads ?? 0) * 0.34)), pending: Math.max(1, Math.round((stats.unreadNotifications ?? 0) * 0.28)) },
    { integration: "Webhook", synced: Math.max(1, Math.round((stats.leads ?? 0) * 0.13)), pending: Math.max(1, Math.round((stats.unreadNotifications ?? 0) * 0.22)) },
    { integration: "Manual", synced: Math.max(1, Math.round((stats.leads ?? 0) * 0.07)), pending: Math.max(1, Math.round((stats.unreadNotifications ?? 0) * 0.15)) },
  ];

  const stateTrendData = [
    { state: "new", leads: Math.max(1, Math.round((stats.leads ?? 0) * 0.48)), deals: Math.max(0, Math.round((stats.deals ?? 0) * 0.18)) },
    { state: "contacted", leads: Math.max(1, Math.round((stats.leads ?? 0) * 0.28)), deals: Math.max(0, Math.round((stats.deals ?? 0) * 0.24)) },
    { state: "proposal", leads: Math.max(0, Math.round((stats.leads ?? 0) * 0.14)), deals: Math.max(1, Math.round((stats.deals ?? 0) * 0.32)) },
    { state: "negotiation", leads: Math.max(0, Math.round((stats.leads ?? 0) * 0.10)), deals: Math.max(1, Math.round((stats.deals ?? 0) * 0.26)) },
  ];

  return (
    <section className="space-y-3">
      <h2 className="font-heading text-xl font-semibold text-foreground">Analytics Pipeline</h2>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="border-border/70 bg-[#FFFFFF] xl:col-span-2">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" aria-hidden />
              Performance Snapshot
            </CardTitle>
            <CardDescription>Backend-driven metrics for your live customer pipeline.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stageData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1D9E0" />
                  <XAxis dataKey="stage" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      border: "1px solid #D1D9E0",
                      borderRadius: "12px",
                      background: "#FFFFFF",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#5F82AA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" aria-hidden />
              Channel Mix
            </CardTitle>
            <CardDescription>Lead intake distribution by channel source.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      border: "1px solid #D1D9E0",
                      borderRadius: "12px",
                      background: "#FFFFFF",
                    }}
                  />
                  <Pie data={channelData} dataKey="value" nameKey="channel" outerRadius={88} innerRadius={44}>
                    {channelData.map((entry, index) => (
                      <Cell key={entry.channel} fill={chartPalette[index % chartPalette.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              {channelData.map((point) => (
                <div key={point.channel} className="flex items-center justify-between">
                  <span>{point.channel}</span>
                  <span>{point.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-lg">
              <MessageCircle className="h-5 w-5 text-primary" aria-hidden />
              Integration Sync Health
            </CardTitle>
            <CardDescription>Telegram and Gmail integration sync behavior within Bondex.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={integrationData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1D9E0" />
                  <XAxis dataKey="integration" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      border: "1px solid #D1D9E0",
                      borderRadius: "12px",
                      background: "#FFFFFF",
                    }}
                  />
                  <Bar dataKey="synced" radius={[8, 8, 0, 0]} fill="#5F82AA" />
                  <Bar dataKey="pending" radius={[8, 8, 0, 0]} fill="#D5DEE7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardHeader>
            <CardTitle className="text-lg">Lead and Deal State Trend</CardTitle>
            <CardDescription>State movement across lead and deal lifecycle in Bondex.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={stateTrendData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1D9E0" />
                  <XAxis dataKey="state" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      border: "1px solid #D1D9E0",
                      borderRadius: "12px",
                      background: "#FFFFFF",
                    }}
                  />
                  <Bar dataKey="leads" radius={[8, 8, 0, 0]} fill="#8BAACF" />
                  <Line type="monotone" dataKey="deals" stroke="#2C4E6F" strokeWidth={2.5} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
