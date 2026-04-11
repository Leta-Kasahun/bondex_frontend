"use client";

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
import { type AdminSystemStats } from "../../types/admin.types";

type AdminAnalyticsPanelProps = {
  title: string;
  description: string;
  stats?: AdminSystemStats;
};

type ChartPoint = {
  label: string;
  value: number;
};

const CHART_PALETTE = ["#2C4E6F", "#5F82AA", "#8BAACF", "#C3CDD6", "#DCE4EC"];

const normalizeData = (rows: Array<{ label: string; value: number }>): ChartPoint[] => {
  if (rows.length > 0) {
    return rows;
  }

  return [{ label: "No data", value: 0 }];
};

export function AdminAnalyticsPanel({ title, description, stats }: AdminAnalyticsPanelProps) {
  const platformData = normalizeData(
    (stats?.leadsByPlatform ?? []).map((item) => ({
      label: item.platform,
      value: item.count,
    }))
  );

  const statusData = normalizeData(
    (stats?.leadsByStatus ?? []).map((item) => ({
      label: item.status,
      value: item.count,
    }))
  );

  const stageData = normalizeData(
    (stats?.dealsByStage ?? []).map((item) => ({
      label: item.stage,
      value: item.count,
    }))
  );

  return (
    <section className="space-y-3">
      <div>
        <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="border-border/70 bg-[#FFFFFF] xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Lead source distribution</CardTitle>
            <CardDescription>Inbound platform volumes from backend grouped metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D1D9E0" />
                  <XAxis dataKey="label" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      border: "1px solid #D1D9E0",
                      borderRadius: "12px",
                      background: "#FFFFFF",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#5F82AA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-[#FFFFFF]">
          <CardHeader>
            <CardTitle className="text-base">Lead status mix</CardTitle>
            <CardDescription>Status composition for enterprise funnel health.</CardDescription>
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
                  <Pie data={statusData} dataKey="value" nameKey="label" outerRadius={88} innerRadius={40}>
                    {statusData.map((entry, index) => (
                      <Cell key={entry.label} fill={CHART_PALETTE[index % CHART_PALETTE.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              {statusData.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="capitalize">{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/70 bg-[#FFFFFF]">
        <CardHeader>
          <CardTitle className="text-base">Deal stage progression</CardTitle>
          <CardDescription>Pipeline stage load from backend deal-stage aggregation.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D1D9E0" />
                <XAxis dataKey="label" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    border: "1px solid #D1D9E0",
                    borderRadius: "12px",
                    background: "#FFFFFF",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#2C4E6F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
