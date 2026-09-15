import { useRef, type PointerEvent } from "react";
import { FIXTURES, PIPE_Y, SLOT_COUNT, SLOT_XS, SINGER, gelById } from "@/lib/game/catalog";
import { t } from "@/lib/game/i18n";

import { fixtureLevel, poolFor, portOccupied } from "@/lib/game/lighting";
import { useGame } from "@/lib/game/store";
import { Port } from "./port.tsx";
import { BeamsCanvas } from "./beams-canvas.tsx";
import { Inspector } from "./inspector.tsx";
import { cn } from "@/lib/utils";

type DragGel = { kind: "gel"; gelId: string } | { kind: "fixture"; fixtureId: string } | null;

export function StageView({
  hoverSlot,
  setHoverSlot,
  holding,
}: {
  hoverSlot: number | null;
  setHoverSlot: (n: number | null) => void;
  holding: DragGel;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fixtures = useGame((s) => s.fixtures);
  const selected = useGame((s) => s.selectedFixtureId);
  const selectFixture = useGame((s) => s.selectFixture);
  const hangFixture = useGame((s) => s.hangFixture);
  const applyGel = useGame((s) => s.applyGel);
  const clickPort = useGame((s) => s.clickPort);
  const pendingFrom = useGame((s) => s.pendingFrom);
  const cables = useGame((s) => s.cables);
  const faders = useGame((s) => s.faders);
  const grandMaster = useGame((s) => s.grandMaster);
  const blackout = useGame((s) => s.blackout);
  const state = useGame.getState();
  const setAim = useGame((s) => s.setAim);
  const locale = useGame((s) => s.locale);
  void faders;
  void grandMaster;
  void blackout;

  const slotFromPoint = (clientX: number, clientY: number) => {
    const el = rootRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const x = (clientX - r.left) / r.width;
    const y = (clientY - r.top) / r.height;
    if (y > 0.32) return null;
    let best = 0;
    let dist = 99;
    for (let i = 0; i < SLOT_COUNT; i++) {
      const d = Math.abs(x - SLOT_XS[i]!);
      if (d < dist) {
        dist = d;
        best = i;
      }
    }
    return dist < 0.1 ? best : null;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (holding?.kind === "fixture") setHoverSlot(slotFromPoint(e.clientX, e.clientY));
  };

  const onPointerUp = (e: PointerEvent) => {
    if (holding?.kind === "fixture") {
      const slot = slotFromPoint(e.clientX, e.clientY);
      if (slot !== null) hangFixture(holding.fixtureId, slot);
    }
    setHoverSlot(null);
  };

  const hung = fixtures.filter((f) => f.hangSlot !== null);

  return (
    <section
      ref={rootRef}
      className="relative min-h-0 flex-1 overflow-hidden bg-bg"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={() => setHoverSlot(null)}
    >
      <img
        src="/images/stage.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        crossOrigin="anonymous"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/55" />
      <BeamsCanvas />

      <div
        className="absolute left-[8%] right-[8%] z-20 h-2.5 rounded-sm"
        style={{
          top: `${PIPE_Y * 100}%`,
          background:
            "linear-gradient(180deg, #8a8a90, #3a3a40 40%, #c4c4ca 50%, #2e2e32)",
          boxShadow: "0 8px 16px rgb(0 0 0 / 0.45)",
        }}
      />

      {SLOT_XS.map((x, i) => (
        <button
          key={i}
          type="button"
          aria-label={t(locale, "ui.slot", { n: i + 1 })}
          className={cn(
            "absolute z-20 flex size-11 -translate-x-1/2 items-center justify-center rounded-md border border-dashed",
            hoverSlot === i ? "border-accent bg-accent/15" : "border-fg/20",
          )}
          style={{ left: `${x * 100}%`, top: `${PIPE_Y * 100 - 1.2}%` }}
          onClick={() => {
            if (holding?.kind === "fixture") hangFixture(holding.fixtureId, i);
          }}
        />
      ))}

      {hung.map((f) => {
        const spec = FIXTURES[f.kind];
        const x = SLOT_XS[f.hangSlot!]!;
        const live = fixtureLevel(state, f) > 0.05;
        return (
          <div
            key={f.id}
            className={cn(
              "absolute z-20 flex -translate-x-1/2 flex-col items-center",
              selected === f.id && "drop-shadow-[0_0_12px_var(--color-accent)]",
            )}
            style={{
              left: `${x * 100}%`,
              top: `${PIPE_Y * 100 - 1}%`,
            }}
          >
            <button
              type="button"
              onClick={() => {
                selectFixture(f.id);
                if (holding && holding.kind === "gel") applyGel(f.id, holding.gelId);
              }}
              className="relative"
            >
              <img
                src={spec.sprite}
                alt=""
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                style={{ transform: `rotate(${f.tilt * 0.35}deg)` }}
                crossOrigin="anonymous"
                draggable={false}
              />
              {f.gelId ? (
                <span
                  className="absolute bottom-3 left-1/2 size-3 -translate-x-1/2 rounded-[2px] ring-1 ring-black/50"
                  style={{ background: `rgb(${gelById(f.gelId)?.rgb.join(",") ?? "255,255,255"})` }}
                />
              ) : null}
            </button>
            <Port
              port={{ type: "fixture-power", fixtureId: f.id }}
              angle={f.powerInAngle}
              live={live}
              pending={pendingFrom?.type === "fixture-power" && pendingFrom.fixtureId === f.id}
              occupied={portOccupied(cables, { type: "fixture-power", fixtureId: f.id })}
              label="PWR"
              size="sm"
              onClick={() => {
                const msg = clickPort({ type: "fixture-power", fixtureId: f.id });
                if (msg) window.dispatchEvent(new CustomEvent("hang-toast", { detail: msg }));
              }}
            />
          </div>
        );
      })}

      <img
        src="/sprites/singer.png"
        alt={t(locale, "ui.singer")}
        className="pointer-events-none absolute z-10 h-[36%] w-auto object-contain"
        style={{
          left: `${SINGER.x * 100}%`,
          top: `${SINGER.y * 100}%`,
          transform: "translate(-50%, -88%)",
          filter: `brightness(${0.55 + hung.reduce((a, f) => a + fixtureLevel(state, f) * 0.5, 0)})`,
        }}
        crossOrigin="anonymous"
        draggable={false}
      />

      {selected
        ? (() => {
            const f = hung.find((x) => x.id === selected);
            if (!f) return null;
            const pool = poolFor(f);
            return (
              <div
                className="absolute z-20 size-16 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border border-accent/70 bg-accent/10"
                style={{ left: `${pool.x * 100}%`, top: `${pool.y * 100}%` }}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  if (!e.currentTarget.hasPointerCapture(e.pointerId) || !rootRef.current) return;
                  const r = rootRef.current.getBoundingClientRect();
                  const nx = (e.clientX - r.left) / r.width;
                  const ny = (e.clientY - r.top) / r.height;
                  const slotX = SLOT_XS[f.hangSlot!]!;
                  const pan = (nx - slotX) / 0.34;
                  const tilt = (ny - 0.84) / 0.0018;
                  setAim(f.id, pan, tilt);
                }}
                aria-label={t(locale, "ui.aimPool")}
              />
            );
          })()
        : null}

      <Inspector />
    </section>
  );
}
