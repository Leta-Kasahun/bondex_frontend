import { type ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

type IntegrationSectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function IntegrationSectionCard({ title, description, children, className }: IntegrationSectionCardProps) {
  return (
    <Card className={className ?? "border-border/70 bg-[#FFFFFF]"}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
