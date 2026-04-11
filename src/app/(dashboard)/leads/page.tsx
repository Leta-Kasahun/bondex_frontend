import { LeadManagementPage } from "@/src/features/leads";
import { UserDashboardShell } from "@/src/features/users";

export default function LeadsDashboardPage() {
  return (
    <UserDashboardShell>
      <LeadManagementPage />
    </UserDashboardShell>
  );
}
