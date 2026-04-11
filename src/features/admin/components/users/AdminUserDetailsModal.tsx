import { Building2, CalendarClock, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { type AdminUserDetails } from "../../types/admin.types";

type AdminUserDetailsModalProps = {
  open: boolean;
  user?: AdminUserDetails;
  isLoading: boolean;
  onOpenChange: (value: boolean) => void;
};

const formatDate = (value?: string | null): string => {
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

export function AdminUserDetailsModal({ open, user, isLoading, onOpenChange }: AdminUserDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>User details</DialogTitle>
          <DialogDescription>
            Review profile, businesses, and login sessions before taking admin actions.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? <p className="text-sm text-muted-foreground">Loading user details...</p> : null}

        {!isLoading && !user ? <p className="text-sm text-muted-foreground">No user details available.</p> : null}

        {!isLoading && user ? (
          <div className="space-y-4">
            <Card className="border-border/70 bg-[#FFFFFF]">
              <CardHeader>
                <CardTitle className="text-base">{user.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2">
                <p>
                  <span className="font-medium text-foreground">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium text-foreground">Status:</span>{" "}
                  {user.isActive ? "Active" : "Blocked"}
                </p>
                <p>
                  <span className="font-medium text-foreground">Created:</span> {formatDate(user.createdAt)}
                </p>
                <p>
                  <span className="font-medium text-foreground">Updated:</span> {formatDate(user.updatedAt)}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-[#FFFFFF]">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2 text-base">
                  <Building2 className="h-4 w-4 text-primary" aria-hidden />
                  Businesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.businesses.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No businesses registered for this user.</p>
                ) : (
                  <div className="space-y-3">
                    {user.businesses.map((business) => (
                      <div key={business.id} className="rounded-lg border border-border/70 p-3 text-sm">
                        <p className="font-medium text-foreground">{business.name}</p>
                        <p className="text-muted-foreground">{business.type ?? "General"}</p>
                        <p className="mt-2 text-muted-foreground">
                          Leads: {business.leadCount} | Deals: {business.dealCount}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-[#FFFFFF]">
              <CardHeader>
                <CardTitle className="inline-flex items-center gap-2 text-base">
                  <CalendarClock className="h-4 w-4 text-primary" aria-hidden />
                  Recent sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.loginHistory.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent login history found.</p>
                ) : (
                  <div className="space-y-2">
                    {user.loginHistory.slice(0, 8).map((session) => (
                      <div key={session.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/70 p-3 text-sm">
                        <span className="text-foreground">Created {formatDate(session.createdAt)}</span>
                        <span className="text-muted-foreground">Expires {formatDate(session.expiresAt)}</span>
                        <span className={session.revokedAt ? "text-destructive" : "inline-flex items-center gap-1 text-emerald-700"}>
                          {session.revokedAt ? "Revoked" : <><ShieldCheck className="h-3.5 w-3.5" aria-hidden />Active</>}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
