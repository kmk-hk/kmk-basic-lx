import { Cable, Plug } from "lucide-react";
import { FIXTURES, GELS } from "@/lib/game/catalog";
import { t, type MsgKey } from "@/lib/game/i18n";
import { portOccupied } from "@/lib/game/lighting";
import { useGame } from "@/lib/game/store";
import { Port } from "./port.tsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Rack({
  onPickFixture,
  onPickGel,
}: {
  onPickFixture: (id: string) => void;
  onPickGel: (gelId: string) => void;
}) {
  const fixtures = useGame((s) => s.fixtures);
  const holding = useGame((s) => s.holding);
  const setHolding = useGame((s) => s.setHolding);
  const clickPort = useGame((s) => s.clickPort);
  const pendingFrom = useGame((s) => s.pendingFrom);
  const cables = useGame((s) => s.cables);
  const dimmerOutAngles = useGame((s) => s.dimmerOutAngles);
  const dimmerDmxAngle = useGame((s) => s.dimmerDmxAngle);
  const rackOpen = useGame((s) => s.rackOpen);
  const setRackOpen = useGame((s) => s.setRackOpen);
  const locale = useGame((s) => s.locale);

  const toast = (msg: MsgKey | null) => {
    if (msg) window.dispatchEvent(new CustomEvent("hang-toast", { detail: msg }));
  };

  const body = (
    <>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted">RACK</p>
          <h2 className="font-display text-xl text-fg">{t(locale, "ui.rack")}</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setRackOpen(false)}
        >
          {t(locale, "ui.close")}
        </Button>
      </div>

      <p className="mb-2 text-xs text-muted">{t(locale, "ui.fixtures")}</p>
      <div className="grid grid-cols-2 gap-2">
        {fixtures
          .filter((f) => f.hangSlot === null)
          .map((f) => {
            const spec = FIXTURES[f.kind];
            return (
              <button
                key={f.id}
                type="button"
                onPointerDown={() => onPickFixture(f.id)}
                className={cn(
                  "flex flex-col items-center rounded-md border border-border bg-surface-2 px-2 py-2",
                  holding?.kind === "fixture" && holding.fixtureId === f.id && "ring-2 ring-accent",
                )}
              >
                <img
                  src={spec.sprite}
                  alt=""
                  className="h-14 w-14 object-contain"
                  crossOrigin="anonymous"
                  draggable={false}
                />
                <span className="text-xs text-fg">
                  {t(locale, `fx.${f.kind}` as MsgKey)}
                </span>
              </button>
            );
          })}
      </div>

      <p className="mb-2 mt-4 text-xs text-muted">{t(locale, "ui.cables")}</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() =>
            setHolding(holding?.kind === "cable" && holding.cable === "power" ? null : { kind: "cable", cable: "power" })
          }
          className={cn(
            "flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm",
            holding?.kind === "cable" && holding.cable === "power" && "ring-2 ring-accent",
          )}
        >
          <Plug className="size-4 text-muted" />
          {t(locale, "ui.powerCable")}
        </button>
        <button
          type="button"
          onClick={() =>
            setHolding(holding?.kind === "cable" && holding.cable === "dmx" ? null : { kind: "cable", cable: "dmx" })
          }
          className={cn(
            "flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm",
            holding?.kind === "cable" && holding.cable === "dmx" && "ring-2 ring-accent",
          )}
        >
          <Cable className="size-4 text-muted" />
          {t(locale, "ui.dmxCable")}
        </button>
      </div>

      <p className="mb-2 mt-4 text-xs text-muted">{t(locale, "ui.gels")}</p>
      <div className="grid grid-cols-3 gap-1.5">
        {GELS.map((g) => (
          <button
            key={g.id}
            type="button"
            onPointerDown={() => onPickGel(g.id)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md border border-border bg-surface-2 px-1 py-2",
              holding?.kind === "gel" && holding.gelId === g.id && "ring-2 ring-accent",
            )}
          >
            <span
              className="h-7 w-full rounded-sm ring-1 ring-black/40"
              style={{ background: `rgb(${g.rgb.join(",")})` }}
            />
            <span className="font-mono text-[9px] text-muted">L{g.lee}</span>
            <span className="text-[11px] text-fg">{t(locale, `gel.${g.id}` as MsgKey)}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-border bg-surface-2 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted">DIMMER PACK</p>
            <p className="text-sm text-fg">{t(locale, "ui.dimmer")}</p>
          </div>
          <Badge>DMX</Badge>
        </div>
        <div className="mb-2 flex justify-start">
          <Port
            port={{ type: "dimmer-dmx" }}
            angle={dimmerDmxAngle}
            pending={pendingFrom?.type === "dimmer-dmx"}
            occupied={portOccupied(cables, { type: "dimmer-dmx" })}
            label="DMX IN"
            onClick={() => toast(clickPort({ type: "dimmer-dmx" }))}
          />
        </div>
        <div className="grid grid-cols-6 gap-1">
          {dimmerOutAngles.map((angle, i) => (
            <Port
              key={i}
              port={{ type: "dimmer-out", channel: i + 1 }}
              angle={angle}
              pending={pendingFrom?.type === "dimmer-out" && pendingFrom.channel === i + 1}
              occupied={portOccupied(cables, { type: "dimmer-out", channel: i + 1 })}
              label={`${i + 1}`}
              size="sm"
              onClick={() => toast(clickPort({ type: "dimmer-out", channel: i + 1 }))}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden min-h-0 w-[280px] shrink-0 overflow-y-auto border-r border-border bg-surface p-3 lg:block">
        {body}
      </aside>
      {rackOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-bg/70"
            aria-label={t(locale, "ui.closeRack")}
            onClick={() => setRackOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[min(100%,320px)] overflow-y-auto border-r border-border bg-surface p-3 shadow-2xl">
            {body}
          </aside>
        </div>
      ) : null}
    </>
  );
}
