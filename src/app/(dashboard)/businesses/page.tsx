import { BusinessManagementPage } from "@/src/features/business";
import { UserDashboardShell } from "@/src/features/users";

export default function BusinessesDashboardPage() {
  return (
    <UserDashboardShell>
      <BusinessManagementPage />
    </UserDashboardShell>
  );
}
