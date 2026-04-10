type AuthErrorTextProps = {
  message?: string;
};

export function AuthErrorText({ message }: AuthErrorTextProps) {
  if (!message) return null;
  return <p className="text-sm text-destructive">{message}</p>;
}
