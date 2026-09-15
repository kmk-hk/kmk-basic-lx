import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-muted",
        className,
      )}
      {...props}
    />
  );
}
