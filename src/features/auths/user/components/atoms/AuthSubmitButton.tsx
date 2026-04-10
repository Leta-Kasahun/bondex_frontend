import { Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

type AuthSubmitButtonProps = {
  label: string;
  loadingLabel: string;
  isLoading: boolean;
};

export function AuthSubmitButton({ label, loadingLabel, isLoading }: AuthSubmitButtonProps) {
  return (
    <Button type="submit" className="h-11 w-full text-base font-semibold" disabled={isLoading}>
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {loadingLabel}
        </span>
      ) : (
        label
      )}
    </Button>
  );
}
