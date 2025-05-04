
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CipherInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  fullWidth?: boolean;
  type?: string;
  inputMode?: "numeric" | "text" | "decimal";
  min?: number;
  max?: number;
}

const CipherInput: React.FC<CipherInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  multiline = false,
  className = "",
  fullWidth = false,
  type = "text",
  inputMode,
  min,
  max,
}) => {
  return (
    <div className={cn("mb-4", fullWidth ? "w-full" : "", className)}>
      <Label htmlFor={id} className="mb-2 block">
        {label}
      </Label>
      {multiline ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="resize-none min-h-[120px]"
        />
      ) : (
        <Input
          type={type}
          inputMode={inputMode}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
        />
      )}
    </div>
  );
};

export default CipherInput;
