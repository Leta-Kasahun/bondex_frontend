import { Eye, Lock, Trash2, Unlock } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Businesses</TableHead>
          <TableHead>Leads</TableHead>
          <TableHead>Deals</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const isProcessing = processingUserId === user.id;

          return (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-foreground">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={user.isActive ? "rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700" : "rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700"}
                >
                  {user.isActive ? "Active" : "Blocked"}
                </span>
              </TableCell>
              <TableCell>{user.totalBusinesses}</TableCell>
              <TableCell>{user.totalLeads}</TableCell>
              <TableCell>{user.totalDeals}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => onViewDetails(user.id)}>
                    <Eye className="h-3.5 w-3.5" aria-hidden />
                    Details
                  </Button>

                  {user.isActive ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isProcessing}
                      onClick={() => onBlock(user.id)}
                    >
                      <Lock className="h-3.5 w-3.5" aria-hidden />
                      Block
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isProcessing}
                      onClick={() => onUnblock(user.id)}
                    >
                      <Unlock className="h-3.5 w-3.5" aria-hidden />
                      Unblock
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={isProcessing}
                    onClick={() => onDelete(user.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
