import { useCallback, useRef, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  onChange: (v: number) => void;
  label: string;
  hot?: boolean;
  accent?: "master" | "channel";
};

export function Fader({ value, onChange, label, hot, accent = "channel" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const setFromY = useCallback(
    (clientY: number) => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const v = 1 - (clientY - r.top) / r.height;
      onChange(Math.max(0, Math.min(1, v)));
    },
    [onChange],
  );

  const onPointerDown = (e: PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromY(e.clientY);
  };

  return (
    <div className="flex w-11 flex-col items-center gap-1.5 sm:w-12">
      <span
        className={cn(
          "size-1.5 rounded-full",
          hot ? "bg-live shadow-[0_0_8px_var(--color-live)]" : "bg-border",
        )}
        aria-hidden
      />
      <div
        ref={trackRef}
        className="relative h-24 w-8 touch-none sm:h-[7.5rem]"
        onPointerDown={onPointerDown}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromY(e.clientY);
        }}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value * 100)}
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") onChange(Math.min(1, value + 0.05));
          if (e.key === "ArrowDown") onChange(Math.max(0, value - 0.05));
        }}
      >
        <div className="absolute inset-x-[11px] inset-y-0 rounded-sm bg-bg shadow-inner ring-1 ring-border" />
        {Array.from({ length: 11 }, (_, i) => (
          <span
            key={i}
            className="absolute right-0 h-px w-1.5 bg-border"
            style={{ top: `${i * 10}%` }}
          />
        ))}
        <div
          className={cn(
            "absolute left-1/2 z-10 h-[18px] w-7 -translate-x-1/2 -translate-y-1/2 rounded-[3px] shadow-md ring-1 ring-black/40",
            accent === "master" ? "bg-live" : "bg-accent",
          )}
          style={{ top: `${(1 - value) * 100}%` }}
        >
          <span className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-black/25" />
        </div>
      </div>
      <span className="font-mono text-[11px] tabular-nums text-muted">{label}</span>
    </div>
  );
}
