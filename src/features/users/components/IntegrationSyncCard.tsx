import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Link2Off } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { cn } from "@/src/utils/cn";

type IntegrationSyncCardProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  status: "connected" | "pending";
  message: string;
};

export function IntegrationSyncCard({ icon: Icon, title, subtitle, status, message }: IntegrationSyncCardProps) {
  return (
    <Card className="border-border/70 bg-[#FFFFFF]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between gap-3 text-base">
          <span className="inline-flex items-center gap-2 text-foreground">
            <Icon className="h-5 w-5 text-primary" aria-hidden />
            {title}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
              status === "connected"
                ? "bg-primary/10 text-primary"
                : "bg-muted text-muted-foreground"
            )}
          >
            {status === "connected" ? <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> : <Link2Off className="h-3.5 w-3.5" aria-hidden />}
            {status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium text-foreground">{subtitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
