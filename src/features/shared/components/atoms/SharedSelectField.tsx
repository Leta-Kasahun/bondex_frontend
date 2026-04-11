import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type SharedSelectFieldProps = {
  placeholder: string;
  value: string;
  options: Option[];
  onValueChange: (value: string) => void;
};

export function SharedSelectField({ placeholder, value, options, onValueChange }: SharedSelectFieldProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-10 min-w-40 bg-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
