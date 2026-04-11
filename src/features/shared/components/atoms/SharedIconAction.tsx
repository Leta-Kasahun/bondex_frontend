import type { LucideIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";

type SharedIconActionProps = {
  icon: LucideIcon;
  label: string;
};

export function SharedIconAction({ icon: Icon, label }: SharedIconActionProps) {
  return (
    <Button type="button" variant="outline" size="icon-sm" aria-label={label} title={label}>
      <Icon className="h-4 w-4" aria-hidden />
    </Button>
  );
}
