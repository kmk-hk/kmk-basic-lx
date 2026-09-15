import { cn } from "@/lib/utils";
import type { Angle, PortRef } from "@/lib/game/types";
import { portKey } from "@/lib/game/catalog";

type Props = {
  port: PortRef;
  angle: Angle;
  live?: boolean;
  pending?: boolean;
  occupied?: boolean;
  label?: string;
  size?: "sm" | "md";
  onClick: () => void;
};

export function Port({
  port,
  angle,
  live,
  pending,
  occupied,
  label,
  size = "md",
  onClick,
}: Props) {
  const dmx = port.type === "dimmer-dmx" || port.type === "console-dmx";
  return (
    <button
      type="button"
      data-port={portKey(port)}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-0.5 rounded-md p-1 text-left",
        pending && "ring-2 ring-accent",
      )}
      aria-label={label ?? portKey(port)}
    >
      <span
        className={cn(
          "relative grid place-items-center rounded-full border bg-bg",
          size === "md" ? "size-8" : "size-7",
          occupied ? "border-accent" : "border-border",
          live && "shadow-[0_0_10px_var(--color-tungsten)]",
        )}
      >
        <span
          className={cn(
            "block rounded-full",
            dmx ? "size-4 border-2 border-muted" : "size-3 bg-surface-2 ring-1 ring-border",
          )}
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <span
            className={cn(
              "absolute left-1/2 top-0 -translate-x-1/2 bg-accent",
              dmx ? "h-1.5 w-1" : "h-1.5 w-0.5",
            )}
          />
        </span>
      </span>
      {label ? (
        <span className="font-mono text-[9px] leading-none tracking-wide text-muted">{label}</span>
      ) : null}
    </button>
  );
}
