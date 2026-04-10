import type { LucideIcon } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/utils/cn";

type AuthInputFieldProps = {
  label: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  icon: LucideIcon;
  error?: string;
  autoComplete?: string;
};

export function AuthInputField({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  icon: Icon,
  error,
  autoComplete,
}: AuthInputFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-[15px] font-medium text-foreground">{label}</span>
      <div className={cn("relative", error ? "text-destructive" : "text-muted-foreground")}>
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden />
        <Input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            "h-11 pl-10 pr-3 text-[15px] placeholder:text-[15px] md:text-[15px]",
            error ? "border-destructive focus-visible:ring-destructive/20" : ""
          )}
        />
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </label>
  );
}
