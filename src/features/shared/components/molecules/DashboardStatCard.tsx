import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

type DashboardStatCardProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  note: string;
};

export function DashboardStatCard({ icon: Icon, title, value, note }: DashboardStatCardProps) {
  return (
    <Card className="border-border/70 bg-[#FFFFFF]">
      <CardHeader className="pb-2">
        <CardTitle className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="h-4 w-4 text-primary" aria-hidden />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-heading text-3xl font-semibold text-foreground">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  );
}
