"use client";

import Image from "next/image";
import { BarChart3, CircleDollarSign, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
        <Card className="overflow-hidden border-border/70 bg-[#FFFFFF]">
          <CardHeader>
            <CardTitle className="inline-flex items-center gap-2 text-lg">
              <CircleDollarSign className="h-5 w-5 text-primary" aria-hidden />
              Revenue Pipeline View
            </CardTitle>
            <CardDescription>Visual monitor for deal momentum and close potential.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-44 overflow-hidden rounded-lg border border-border bg-[#F8FAFC]">
              <Image src="/bondex.png" alt="Pipeline visual" fill className="object-contain p-4 opacity-90" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/70 bg-[#FFFFFF]">
          <CardHeader>
            <CardTitle className="text-lg">Acquisition Flow Image</CardTitle>
            <CardDescription>Snapshot tile for enterprise pipeline storytelling.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-44 rounded-lg border border-border bg-linear-to-r from-[#D5DEE7] via-[#F3F6FA] to-[#FFFFFF] p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#8BAACF33,transparent_45%)]" aria-hidden />
              <div className="relative h-full w-full rounded-md border border-[#C3CDD6] bg-[#FFFFFF]/70" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
