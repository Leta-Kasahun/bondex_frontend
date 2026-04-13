import { PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { type AdminUser } from "../../types/admin.types";

type AdminUsersTableProps = {
  users: AdminUser[];
  processingUserId?: string;
  onViewDetails: (userId: string) => void;
  onBlock: (userId: string) => void;
  onUnblock: (userId: string) => void;
  onDelete: (userId: string) => void;
};

const formatDate = (value?: string): string => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(parsed);
};

export function AdminUsersTable({
  users,
  processingUserId,
  onViewDetails,
  onBlock,
  onUnblock,
  onDelete,
}: AdminUsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" style={{ minWidth: 920 }}>
        <thead className="bg-[#F3F6FA] text-xs uppercase tracking-wide text-[#4F647A]">
          <tr>
            <th className="px-4 py-3 font-semibold">User</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Businesses</th>
            <th className="px-4 py-3 font-semibold">Leads</th>
            <th className="px-4 py-3 font-semibold">Deals</th>
            <th className="px-4 py-3 font-semibold">Created</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isProcessing = processingUserId === user.id;

            return (
              <tr key={user.id} className="border-t border-border transition-colors hover:bg-sidebar-primary/5">
                <td className="px-4 py-2.5 align-middle">
                  <div className="max-w-64">
                    <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-2.5 align-middle">
                  <Select
                    value={user.isActive ? "active" : "blocked"}
                    onValueChange={(value) => {
                      if (value === "active" && !user.isActive) {
                        onUnblock(user.id);
                        return;
                      }

                      if (value === "blocked" && user.isActive) {
                        onBlock(user.id);
                      }
                    }}
                    disabled={isProcessing}
                  >
                    <SelectTrigger className="h-8 w-32 bg-[#FFFFFF] text-sm">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-2.5 align-middle text-sm text-foreground">{user.totalBusinesses}</td>
                <td className="px-4 py-2.5 align-middle text-sm text-foreground">{user.totalLeads}</td>
                <td className="px-4 py-2.5 align-middle text-sm text-foreground">{user.totalDeals}</td>
                <td className="px-4 py-2.5 align-middle text-sm text-muted-foreground">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-2.5 align-middle">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-sidebar-primary hover:bg-sidebar-primary/10 hover:text-sidebar-primary"
                      onClick={() => onViewDetails(user.id)}
                      aria-label={`Edit ${user.name}`}
                    >
                      <PencilLine className="h-5 w-5" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => onDelete(user.id)}
                      disabled={isProcessing}
                      aria-label={`Delete ${user.name}`}
                    >
                      <Trash2 className="h-5 w-5" aria-hidden />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
