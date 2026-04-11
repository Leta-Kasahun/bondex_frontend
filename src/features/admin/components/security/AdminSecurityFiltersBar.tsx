import { Search } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { SharedSelectField } from "@/src/features/shared";

type AdminSecurityFiltersBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onReset: () => void;
};

const statusOptions = [
  { label: "All accounts", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

export function AdminSecurityFiltersBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onReset,
}: AdminSecurityFiltersBarProps) {
  return (
    <Card className="border-border/70 bg-[#FFFFFF]">
      <CardContent className="flex flex-col gap-3 pt-6 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search users for security review"
            className="h-10 bg-[#FFFFFF] pl-10"
          />
        </div>

        <SharedSelectField
          placeholder="Account status"
          value={status}
          options={statusOptions}
          onValueChange={onStatusChange}
        />

        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}
