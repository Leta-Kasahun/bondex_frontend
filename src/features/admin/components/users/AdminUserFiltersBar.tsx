import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { SharedSelectField } from "@/src/features/shared";

type AdminUserFiltersBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onReset: () => void;
};

const statusOptions = [
  { label: "All users", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
];

export function AdminUserFiltersBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onReset,
}: AdminUserFiltersBarProps) {
  return (
    <Card className="border-border/70 bg-[#FFFFFF]">
      <CardContent className="flex flex-col gap-3 pt-6 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by user name or email"
            className="h-10 bg-[#FFFFFF] pl-10"
          />
        </div>

        <SharedSelectField
          placeholder="Status"
          value={statusFilter}
          options={statusOptions}
          onValueChange={onStatusFilterChange}
        />

        <Button type="button" variant="outline" onClick={onReset}>
          Reset
        </Button>
      </CardContent>
    </Card>
  );
}
