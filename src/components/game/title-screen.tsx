import { Check, Volume2, VolumeX } from "lucide-react";
import { MISSIONS } from "@/lib/game/missions";
import { missionBlurb, missionTitle, t } from "@/lib/game/i18n";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LangToggle } from "./lang-toggle.tsx";
import { cn } from "@/lib/utils";

export function TitleScreen() {
  const startMission = useGame((s) => s.startMission);
  const completed = useGame((s) => s.completedMissions);
  const audioOn = useGame((s) => s.audioOn);
  const setAudioOn = useGame((s) => s.setAudioOn);
  const locale = useGame((s) => s.locale);

  return (
    <div className="relative flex h-dvh flex-col overflow-x-hidden overflow-y-auto bg-bg text-fg">
      <img
        src="/images/stage.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        crossOrigin="anonymous"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/80 to-bg" />
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[55%] w-[28%] -translate-x-1/2 opacity-50"
        style={{
          background:
            "linear-gradient(180deg, rgb(232 201 160 / 0.35), rgb(232 201 160 / 0.05) 70%, transparent)",
          clipPath: "polygon(46% 0, 54% 0, 88% 100%, 12% 100%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between gap-2 px-5 py-4">
        <Badge>HANG NIGHT</Badge>
        <div className="flex items-center gap-1">
          <LangToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAudioOn(!audioOn)}
            aria-label={audioOn ? t(locale, "audio.off") : t(locale, "audio.on")}
          >
            {audioOn ? <Volume2 /> : <VolumeX />}
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 pb-16 pt-2">
        <p className="font-mono text-xs tracking-[0.28em] text-muted">{t(locale, "title.kicker")}</p>
        <h1 className="mt-2 font-display text-5xl leading-none tracking-tight text-balance sm:text-7xl">
          HANG & PATCH
        </h1>
        <p className="mt-2 font-display text-3xl text-accent">{t(locale, "title.hang")}</p>
        <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {t(locale, "title.lead")}
        </p>

        <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MISSIONS.map((m) => {
            const done = completed.includes(m.id);
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => startMission(m.id)}
                  className={cn(
                    "w-full rounded-lg border border-border bg-surface/90 p-4 text-left transition-transform duration-[var(--motion-quick)] hover:-translate-y-0.5",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-muted">
                      {m.index}
                    </span>
                    {done ? <Check className="size-4 text-accent" /> : null}
                  </div>
                  <h2 className="mt-1 font-display text-2xl text-fg">{missionTitle(locale, m.id)}</h2>
                  <p className="mt-2 text-sm leading-snug text-muted">{missionBlurb(locale, m.id)}</p>
                </button>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}
