import { cn } from "@/lib/utils";

interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  outline?: boolean;
}

export function MaterialIcon({ name, outline = false, className, ...props }: MaterialIconProps) {
  return (
    <span
      className={cn(
        outline ? "material-icons-outlined" : "material-icons-round",
        className
      )}
      style={{ fontVariationSettings: "'FILL' 1" }}
      {...props}
    >
      {name}
    </span>
  );
}
