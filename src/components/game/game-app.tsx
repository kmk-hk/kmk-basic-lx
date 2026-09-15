import { useEffect, useState } from "react";
import { missionById } from "@/lib/game/missions";
import { missionTitle, t, type MsgKey } from "@/lib/game/i18n";
import { unlockAudio } from "@/lib/game/audio";
import { useGame } from "@/lib/game/store";
import { TitleScreen } from "./title-screen.tsx";
import { MissionBar } from "./mission-bar.tsx";
import { Rack } from "./rack.tsx";
import { StageView } from "./stage-view.tsx";
import { Console } from "./console.tsx";
import { CablesOverlay } from "./cables-overlay.tsx";
import { ConnectorPuzzle } from "./connector-puzzle.tsx";
import { Button } from "@/components/ui/button";
import { FIXTURES, gelById } from "@/lib/game/catalog";

export function GameApp() {
  const phase = useGame((s) => s.phase);
  const holding = useGame((s) => s.holding);
  const setHolding = useGame((s) => s.setHolding);
  const applyGel = useGame((s) => s.applyGel);
  const selected = useGame((s) => s.selectedFixtureId);
  const markCompleteIfReady = useGame((s) => s.markCompleteIfReady);
  const startMission = useGame((s) => s.startMission);
  const backToTitle = useGame((s) => s.backToTitle);
  const missionId = useGame((s) => s.missionId);
  const fixtures = useGame((s) => s.fixtures);
  const cables = useGame((s) => s.cables);
  const faders = useGame((s) => s.faders);
  const grandMaster = useGame((s) => s.grandMaster);
  const pendingFrom = useGame((s) => s.pendingFrom);
  const locale = useGame((s) => s.locale);

  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [hoverSlot, setHoverSlot] = useState<number | null>(null);
  const [toast, setToast] = useState<MsgKey | null>(null);

  useEffect(() => {
    useGame.getState().hydratePrefs();
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPointer({ x: e.clientX, y: e.clientY });
    const onToast = (e: Event) => {
      const key = (e as CustomEvent<MsgKey>).detail;
      setToast(key);
      window.setTimeout(() => setToast(null), 2800);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        useGame.getState().setHolding(null);
        useGame.getState().selectFixture(null);
        if (useGame.getState().puzzle) useGame.getState().cancelPuzzle();
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("hang-toast", onToast);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("hang-toast", onToast);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-HK" : "en";
  }, [locale]);

  useEffect(() => {
    markCompleteIfReady();
  }, [fixtures, cables, faders, grandMaster, markCompleteIfReady]);

  if (phase === "title") return <TitleScreen />;

  const mission = missionById(missionId);
  const next = missionId === "cue1" ? "cue2" : missionId === "cue2" ? "cue3" : missionId === "cue3" ? "sandbox" : null;
  const ghost =
    holding?.kind === "fixture"
      ? fixtures.find((f) => f.id === holding.fixtureId)
      : null;
  const gel = holding?.kind === "gel" ? gelById(holding.gelId) : null;

  return (
    <div
      className="flex h-dvh flex-col bg-bg text-fg"
      onPointerDown={(e) => {
        unlockAudio();
        setPointer({ x: e.clientX, y: e.clientY });
      }}
    >
      <MissionBar />
      <div className="flex min-h-0 flex-1">
        <Rack
          onPickFixture={(id) => {
            unlockAudio();
            setHolding({ kind: "fixture", fixtureId: id });
          }}
          onPickGel={(gelId) => {
            unlockAudio();
            if (selected) {
              applyGel(selected, gelId);
            } else {
              setHolding({ kind: "gel", gelId });
            }
          }}
        />
        <StageView
          hoverSlot={hoverSlot}
          setHoverSlot={setHoverSlot}
          holding={
            holding?.kind === "fixture" || holding?.kind === "gel"
              ? holding
              : null
          }
        />
      </div>
      {holding || pendingFrom ? (
        <div className="border-t border-border bg-surface-2 px-3 py-1.5 text-center text-xs text-fg">
          {holding?.kind === "cable" && !pendingFrom
            ? t(locale, holding.cable === "dmx" ? "hold.dmx" : "hold.power")
            : pendingFrom
              ? t(locale, "hold.pending")
            : holding?.kind === "fixture"
              ? t(locale, "hold.fixture")
            : holding?.kind === "gel"
              ? t(locale, "hold.gel")
            : null}
        </div>
      ) : null}
      <Console />
      <CablesOverlay pointer={pointer} />
      <ConnectorPuzzle />

      {holding && pointer ? (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
          style={{ left: pointer.x, top: pointer.y }}
        >
          {ghost ? (
            <img
              src={FIXTURES[ghost.kind].sprite}
              alt=""
              className="h-16 w-16 object-contain opacity-90"
              crossOrigin="anonymous"
            />
          ) : gel ? (
            <span
              className="block size-8 rounded-sm ring-1 ring-border"
              style={{ background: `rgb(${gel.rgb.join(",")})` }}
            />
          ) : holding.kind === "cable" ? (
            <span className="rounded-sm bg-surface px-2 py-1 font-mono text-[10px] text-fg ring-1 ring-border">
              {holding.cable === "dmx" ? "DMX" : "PWR"}
            </span>
          ) : null}
        </div>
      ) : null}

      {toast ? (
        <div className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg shadow-lg">
          {t(locale, toast)}
        </div>
      ) : null}

      {phase === "complete" ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-bg/80 px-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 text-center">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted">
              {t(locale, "ui.completeKicker")}
            </p>
            <h2 className="mt-2 font-display text-4xl text-fg">{missionTitle(locale, mission.id)}</h2>
            <p className="mt-2 text-sm text-muted">{t(locale, "ui.completeBody")}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button variant="secondary" className="flex-1" onClick={backToTitle}>
                {t(locale, "ui.back")}
              </Button>
              {next ? (
                <Button className="flex-1" onClick={() => startMission(next)}>
                  {t(locale, "ui.nextCue")}
                </Button>
              ) : (
                <Button className="flex-1" onClick={() => startMission("sandbox")}>
                  {t(locale, "ui.sandbox")}
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
