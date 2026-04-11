import { DealManagementPage } from "@/src/features/deals";
import { UserDashboardShell } from "@/src/features/users";

export default function DealsDashboardPage() {
  return (
    <UserDashboardShell>
      <DealManagementPage />
    </UserDashboardShell>
  );
}
