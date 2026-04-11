import { Search } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { type Business } from "@/src/features/business";
import { leadPriorityOptions, leadStatusOptions } from "../constants/lead-ui.constants";

type LeadFiltersBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  businessId: string;
  businesses: Business[];
  onBusinessChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
};

export function LeadFiltersBar({
  search,
  onSearchChange,
  businessId,
  businesses,
  onBusinessChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}: LeadFiltersBarProps) {
  return (
    <section className="rounded-xl border border-border/70 bg-[#FFFFFF] p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by customer or message"
            className="h-11 bg-[#FFFFFF] pl-11 pr-4 text-base placeholder:text-sm"
          />
        </div>

        <Select value={businessId} onValueChange={onBusinessChange}>
          <SelectTrigger className="h-11 w-full bg-[#FFFFFF] px-4 text-base">
            <SelectValue placeholder="Select business" />
          </SelectTrigger>
          <SelectContent>
            {businesses.map((business) => (
              <SelectItem key={business.id} value={business.id}>
                {business.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="h-11 w-full bg-[#FFFFFF] px-4 text-base">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {leadStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
          <SelectTrigger className="h-11 w-full bg-[#FFFFFF] px-4 text-base">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            {leadPriorityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
