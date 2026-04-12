import { UI_ERROR_MESSAGE } from "@/src/constants";

type AuthErrorTextProps = {
  message?: string;
};

export function AuthErrorText({ message }: AuthErrorTextProps) {
  if (!message) return null;
  return <p className="text-sm text-destructive">{UI_ERROR_MESSAGE}</p>;
}
