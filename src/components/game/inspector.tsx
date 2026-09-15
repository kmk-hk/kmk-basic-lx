import { X } from "lucide-react";
import { FIXTURES, gelById } from "@/lib/game/catalog";
import { t, type MsgKey } from "@/lib/game/i18n";
import { fixtureLevel, patchChannel, singerCoverage } from "@/lib/game/lighting";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";

export function Inspector() {
  const selectedId = useGame((s) => s.selectedFixtureId);
  const fixture = useGame((s) => s.fixtures.find((f) => f.id === s.selectedFixtureId));
  const setAim = useGame((s) => s.setAim);
  const applyGel = useGame((s) => s.applyGel);
  const unhangFixture = useGame((s) => s.unhangFixture);
  const selectFixture = useGame((s) => s.selectFixture);
  const locale = useGame((s) => s.locale);
  const state = useGame();

  if (!fixture || fixture.hangSlot === null || !selectedId) return null;

  const spec = FIXTURES[fixture.kind];
  const ch = patchChannel(state, fixture.id);
  const gel = gelById(fixture.gelId);
  const cover = singerCoverage(fixture);
  const level = fixtureLevel(state, fixture);

  return (
    <aside className="pointer-events-auto absolute bottom-3 right-3 z-20 w-[min(100%-1.5rem,280px)] rounded-lg border border-border bg-surface/95 p-3 shadow-xl">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted">
            {spec.nameEn.toUpperCase()}
          </p>
          <h3 className="font-display text-lg leading-none text-fg">
            {t(locale, `fx.${fixture.kind}` as MsgKey)}
          </h3>
        </div>
        <Button variant="ghost" size="icon" className="size-8" onClick={() => selectFixture(null)}>
          <X className="size-4" />
        </Button>
      </div>
      <p className="mb-3 text-xs text-muted">{t(locale, `fx.${fixture.kind}.blurb` as MsgKey)}</p>
      <dl className="mb-3 grid grid-cols-3 gap-2 font-mono text-[10px] text-muted">
        <div>
          <dt>CHANNEL</dt>
          <dd className="text-fg">{ch ?? "—"}</dd>
        </div>
        <div>
          <dt>LEVEL</dt>
          <dd className="text-fg">{Math.round(level * 100)}%</dd>
        </div>
        <div>
          <dt>COVER</dt>
          <dd className="text-fg">{Math.round(cover * 100)}%</dd>
        </div>
      </dl>
      <label className="mb-2 block text-xs text-muted">
        {t(locale, "ui.pan")}
        <input
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={fixture.pan}
          onChange={(e) => setAim(fixture.id, Number(e.target.value), fixture.tilt)}
          className="mt-1 w-full accent-[var(--color-accent)]"
        />
      </label>
      <label className="mb-3 block text-xs text-muted">
        {t(locale, "ui.tilt")}
        <input
          type="range"
          min={-28}
          max={36}
          step={0.5}
          value={fixture.tilt}
          onChange={(e) => setAim(fixture.id, fixture.pan, Number(e.target.value))}
          className="mt-1 w-full accent-[var(--color-accent)]"
        />
      </label>
      <div className="mb-3 flex items-center justify-between gap-2 text-xs">
        <span className="text-muted">Gel</span>
        <span className="flex items-center gap-2 text-fg">
          {gel ? (
            <>
              <span
                className="size-3 rounded-sm ring-1 ring-border"
                style={{ background: `rgb(${gel.rgb.join(",")})` }}
              />
              {t(locale, `gel.${gel.id}` as MsgKey)}
            </>
          ) : (
            t(locale, "ui.openWhite")
          )}
        </span>
      </div>
      <div className="flex gap-2">
        {gel ? (
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => applyGel(fixture.id, null)}>
            {t(locale, "ui.clearGel")}
          </Button>
        ) : null}
        <Button variant="outline" size="sm" className="flex-1" onClick={() => unhangFixture(fixture.id)}>
          {t(locale, "ui.unhang")}
        </Button>
      </div>
    </aside>
  );
}
