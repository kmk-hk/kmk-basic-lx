import { patchChannel, portOccupied } from "@/lib/game/lighting";
import { useGame } from "@/lib/game/store";
import { Fader } from "./fader.tsx";
import { Port } from "./port.tsx";
import { Button } from "@/components/ui/button";

export function Console() {
  const faders = useGame((s) => s.faders);
  const grandMaster = useGame((s) => s.grandMaster);
  const blackout = useGame((s) => s.blackout);
  const setFader = useGame((s) => s.setFader);
  const setGrandMaster = useGame((s) => s.setGrandMaster);
  const toggleBlackout = useGame((s) => s.toggleBlackout);
  const clickPort = useGame((s) => s.clickPort);
  const pendingFrom = useGame((s) => s.pendingFrom);
  const cables = useGame((s) => s.cables);
  const consoleDmxAngle = useGame((s) => s.consoleDmxAngle);
  const fixtures = useGame((s) => s.fixtures);
  const state = useGame();

  const toast = (msg: string | null) => {
    if (msg) window.dispatchEvent(new CustomEvent("hang-toast", { detail: msg }));
  };

  return (
    <footer className="z-20 border-t border-border bg-surface px-3 py-2 sm:px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-5xl items-end gap-3 overflow-x-auto">
        <div className="flex items-end gap-3">
          <Fader
            value={blackout ? 0 : grandMaster}
            onChange={setGrandMaster}
            label="GM"
            accent="master"
            hot={!blackout && grandMaster > 0.05}
          />
          <div className="flex items-end gap-1 sm:gap-2">
            {faders.map((v, i) => {
              const patched = fixtures.some((f) => patchChannel(state, f.id) === i + 1);
              const hot = !blackout && patched && v * grandMaster > 0.05;
              return (
                <Fader
                  key={i}
                  value={v}
                  onChange={(n) => setFader(i, n)}
                  label={`${i + 1}`}
                  hot={hot}
                />
              );
            })}
          </div>
        </div>
        <div className="ml-auto flex shrink-0 flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Port
              port={{ type: "console-dmx" }}
              angle={consoleDmxAngle}
              pending={pendingFrom?.type === "console-dmx"}
              occupied={portOccupied(cables, { type: "console-dmx" })}
              label="DMX OUT"
              onClick={() => toast(clickPort({ type: "console-dmx" }))}
            />
            <Button
              variant={blackout ? "default" : "secondary"}
              size="sm"
              onClick={toggleBlackout}
            >
              BLACKOUT
            </Button>
          </div>
          <p className="hidden font-mono text-[10px] tracking-[0.14em] text-muted sm:block">
            6CH DESK
          </p>
        </div>
      </div>
    </footer>
  );
}
