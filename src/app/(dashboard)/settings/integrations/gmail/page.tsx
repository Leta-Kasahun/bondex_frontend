import { GmailIntegrationPage } from "@/src/features/integrations/gmail";
import { UserDashboardShell } from "@/src/features/users";

export default function SettingsIntegrationsGmailPage() {
  return (
    <UserDashboardShell>
      <GmailIntegrationPage />
    </UserDashboardShell>
  );
}
