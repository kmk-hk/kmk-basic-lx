import { useEffect, useState } from "react";
import { portKey } from "@/lib/game/catalog";
import { cableSeated } from "@/lib/game/lighting";
import { useGame } from "@/lib/game/store";
import type { PortRef } from "@/lib/game/types";

type Pt = { x: number; y: number };

function centerOf(el: Element | null): Pt | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function findPort(ref: PortRef) {
  return document.querySelector(`[data-port="${portKey(ref)}"]`);
}

export function CablesOverlay({ pointer }: { pointer: Pt | null }) {
  const cables = useGame((s) => s.cables);
  const pendingFrom = useGame((s) => s.pendingFrom);
  const [, bump] = useState(0);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onResize = () => bump((n) => n + 1);
    window.addEventListener("resize", onResize);
    const id = window.setInterval(onResize, 400);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearInterval(id);
    };
  }, []);

  if (!mounted) return null;

  const path = (a: Pt, b: Pt) => {
    const mx = (a.x + b.x) / 2;
    const my = Math.max(a.y, b.y) + 28;
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };

  return (
    <svg className="pointer-events-none fixed inset-0 z-30 h-full w-full" aria-hidden>
      {cables.map((c) => {
        const a = centerOf(findPort(c.from));
        const b = centerOf(findPort(c.to));
        if (!a || !b) return null;
        const live = cableSeated(c);
        return (
          <path
            key={c.id}
            d={path(a, b)}
            fill="none"
            stroke={c.kind === "dmx" ? "var(--color-accent)" : "var(--color-muted)"}
            strokeWidth={live ? 3.5 : 2}
            strokeDasharray={live ? undefined : "5 5"}
            strokeLinecap="round"
            opacity={live ? 0.9 : 0.45}
          />
        );
      })}
      {pendingFrom && pointer
        ? (() => {
            const a = centerOf(findPort(pendingFrom));
            if (!a) return null;
            return (
              <path
                d={path(a, pointer)}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={2.5}
                strokeDasharray="6 5"
                strokeLinecap="round"
                opacity={0.8}
              />
            );
          })()
        : null}
    </svg>
  );
}
