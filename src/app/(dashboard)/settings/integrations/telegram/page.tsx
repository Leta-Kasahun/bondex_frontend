import { TelegramIntegrationPage } from "@/src/features/integrations/telegram";
import { UserDashboardShell } from "@/src/features/users";

export default function SettingsIntegrationsTelegramPage() {
  return (
    <UserDashboardShell>
      <TelegramIntegrationPage />
    </UserDashboardShell>
  );
}
