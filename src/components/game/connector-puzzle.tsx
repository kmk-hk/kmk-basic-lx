import { RotateCw, X } from "lucide-react";
import { socketAngle } from "@/lib/game/catalog";
import { t } from "@/lib/game/i18n";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";

export function ConnectorPuzzle() {
  const puzzle = useGame((s) => s.puzzle);
  const cable = useGame((s) => s.cables.find((c) => c.id === s.puzzle?.cableId));
  const rotatePlug = useGame((s) => s.rotatePlug);
  const cancelPuzzle = useGame((s) => s.cancelPuzzle);
  const dimmerOutAngles = useGame((s) => s.dimmerOutAngles);
  const dimmerDmxAngle = useGame((s) => s.dimmerDmxAngle);
  const consoleDmxAngle = useGame((s) => s.consoleDmxAngle);
  const fixtures = useGame((s) => s.fixtures);
  const locale = useGame((s) => s.locale);

  if (!puzzle || !cable) return null;

  const target = socketAngle(cable.to, {
    fixtures,
    dimmerOutAngles,
    dimmerDmxAngle,
    consoleDmxAngle,
  });
  const dmx = cable.kind === "dmx";
  const aligned = cable.toPlugAngle === target;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-bg/80 px-4"
      role="dialog"
      aria-modal
      aria-labelledby="puzzle-title"
    >
      <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted">ALIGN</p>
            <h2 id="puzzle-title" className="font-display text-2xl tracking-tight text-fg">
              {t(locale, dmx ? "ui.puzzleDmx" : "ui.puzzlePower")}
            </h2>
            <p className="mt-1 text-sm text-muted">{t(locale, "ui.puzzleHint")}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={cancelPuzzle} aria-label={t(locale, "ui.cancel")}>
            <X />
          </Button>
        </div>

        <div className="relative mx-auto grid size-52 place-items-center">
          <div
            className="absolute size-44 rounded-full border-2 border-border bg-bg"
            aria-hidden
          />
          <div
            className="absolute size-40 rounded-full border border-dashed border-muted/50"
            style={{ transform: `rotate(${target}deg)` }}
            aria-hidden
          >
            <span className="absolute left-1/2 top-0 h-4 w-2.5 -translate-x-1/2 rounded-b-sm bg-accent" />
          </div>
          <button
            type="button"
            onClick={rotatePlug}
            className="relative z-10 size-28 rounded-full border-2 border-accent/40 bg-surface-2 shadow-lg"
            style={{ transform: `rotate(${cable.toPlugAngle}deg)` }}
            aria-label={t(locale, "ui.rotatePlug")}
          >
            {dmx ? (
              <>
                <span className="absolute left-1/2 top-[18%] size-2.5 -translate-x-1/2 rounded-full bg-fg" />
                <span className="absolute bottom-[22%] left-[28%] size-2.5 rounded-full bg-fg" />
                <span className="absolute bottom-[22%] right-[28%] size-2.5 rounded-full bg-fg" />
                <span className="absolute left-1/2 top-0 h-3 w-1.5 -translate-x-1/2 bg-live" />
              </>
            ) : (
              <>
                <span className="absolute left-1/2 top-[16%] h-3 w-2.5 -translate-x-1/2 rounded-sm bg-fg" />
                <span className="absolute bottom-[22%] left-[26%] h-3.5 w-2 rounded-sm bg-fg" />
                <span className="absolute bottom-[22%] right-[26%] h-3.5 w-2 rounded-sm bg-fg" />
                <span className="absolute left-1/2 top-0 h-3 w-1.5 -translate-x-1/2 bg-live" />
              </>
            )}
          </button>
        </div>

        <p className="mt-3 text-center font-mono text-xs tabular-nums text-muted">
          {t(locale, "ui.plug")} {cable.toPlugAngle}° · {t(locale, "ui.socket")} {target}°
          {aligned ? ` · ${t(locale, "ui.aligned")}` : ""}
        </p>

        <Button className="mt-4 w-full" onClick={rotatePlug}>
          <RotateCw className="size-4" />
          {t(locale, "ui.rotate90")}
        </Button>
      </div>
    </div>
  );
}
