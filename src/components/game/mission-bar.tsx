import { Check, ChevronDown, Package } from "lucide-react";
import { useState } from "react";
import { missionById, objectiveMet } from "@/lib/game/missions";
import { missionBlurb, missionTitle, objectiveHint, objectiveLabel, t } from "@/lib/game/i18n";
import { useGame } from "@/lib/game/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LangToggle } from "./lang-toggle.tsx";
import { cn } from "@/lib/utils";

export function MissionBar() {
  const missionId = useGame((s) => s.missionId);
  const backToTitle = useGame((s) => s.backToTitle);
  const setRackOpen = useGame((s) => s.setRackOpen);
  const locale = useGame((s) => s.locale);
  const state = useGame();
  const [open, setOpen] = useState(false);
  const mission = missionById(missionId);
  const doneCount = mission.objectives.filter((o) => objectiveMet(state, o.id)).length;
  const nextHint = mission.objectives.find((o) => !objectiveMet(state, o.id));

  return (
    <header className="z-20 border-b border-border bg-surface">
      <div className="flex items-center gap-2 px-3 py-2 sm:px-4">
        <Button variant="ghost" size="sm" onClick={backToTitle}>
          {t(locale, "ui.leave")}
        </Button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Badge>{mission.index}</Badge>
            <h1 className="truncate font-display text-lg leading-none text-fg sm:text-xl">
              {missionTitle(locale, mission.id)}
            </h1>
          </div>
          <p className="hidden truncate text-xs text-muted sm:block">
            {nextHint
              ? objectiveHint(locale, mission.id, nextHint.id)
              : missionBlurb(locale, mission.id)}
          </p>
        </div>
        {!mission.sandbox ? (
          <button
            type="button"
            className="hidden items-center gap-1 font-mono text-xs text-muted sm:flex"
            onClick={() => setOpen((v) => !v)}
          >
            {doneCount}/{mission.objectives.length}
            <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
          </button>
        ) : (
          <span className="font-mono text-xs text-muted">SANDBOX</span>
        )}
        <LangToggle />
        <Button
          variant="secondary"
          size="sm"
          className="lg:hidden"
          onClick={() => setRackOpen(true)}
        >
          <Package className="size-4" />
          {t(locale, "ui.gear")}
        </Button>
      </div>
      {open && !mission.sandbox ? (
        <ul className="grid gap-1 border-t border-border px-3 py-2 sm:grid-cols-2 sm:px-4">
          {mission.objectives.map((o) => {
            const ok = objectiveMet(state, o.id);
            return (
              <li
                key={o.id}
                className={cn("flex items-start gap-2 text-xs", ok ? "text-fg" : "text-muted")}
              >
                <Check className={cn("mt-0.5 size-3.5 shrink-0", ok ? "text-accent" : "opacity-25")} />
                <span>
                  <span className="block text-fg">{objectiveLabel(locale, mission.id, o.id)}</span>
                  {!ok ? (
                    <span className="text-[11px] text-muted">
                      {objectiveHint(locale, mission.id, o.id)}
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </header>
  );
}
