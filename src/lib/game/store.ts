import { create } from "zustand";
import { NEXT_ANGLE, samePort, socketAngle } from "./catalog";
import { allObjectivesMet, missionById } from "./missions";
import { compatible, portOccupied } from "./lighting";
import { playClick, playComplete, playSeat, playStrike, unlockAudio } from "./audio";
import { detectLocale, type Locale, type MsgKey } from "./i18n";
import type { Angle, Cable, Fixture, GameState, Holding, PortRef } from "./types";

const SAVE_KEY = "hang-patch-v1";

function loadSave(): { completedMissions: string[]; audioOn: boolean; locale: Locale } {
  if (typeof window === "undefined") {
    return { completedMissions: [], audioOn: true, locale: "zh" };
  }
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { completedMissions: [], audioOn: true, locale: detectLocale() };
    const p = JSON.parse(raw) as {
      completedMissions?: string[];
      audioOn?: boolean;
      locale?: Locale;
    };
    return {
      completedMissions: p.completedMissions ?? [],
      audioOn: p.audioOn ?? true,
      locale: p.locale === "en" || p.locale === "zh" ? p.locale : detectLocale(),
    };
  } catch {
    return { completedMissions: [], audioOn: true, locale: detectLocale() };
  }
}

function persist(s: Pick<GameState, "completedMissions" | "audioOn" | "locale">) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      completedMissions: s.completedMissions,
      audioOn: s.audioOn,
      locale: s.locale,
    }),
  );
}

function fixturesFor(missionId: string): Fixture[] {
  return missionById(missionId).fixtures.map((f) => ({
    id: f.id,
    kind: f.kind,
    hangSlot: null,
    tilt: 6,
    pan: 0,
    gelId: null,
    powerInAngle: f.powerInAngle,
  }));
}

type Actions = {
  hydratePrefs: () => void;
  startMission: (id: string) => void;
  backToTitle: () => void;
  hangFixture: (fixtureId: string, slot: number) => void;
  unhangFixture: (fixtureId: string) => void;
  selectFixture: (id: string | null) => void;
  setAim: (fixtureId: string, pan: number, tilt: number) => void;
  applyGel: (fixtureId: string, gelId: string | null) => void;
  setHolding: (h: Holding) => void;
  clickPort: (ref: PortRef) => MsgKey | null;
  rotatePlug: () => void;
  cancelPuzzle: () => void;
  disconnectCable: (cableId: string) => void;
  setFader: (index: number, value: number) => void;
  setGrandMaster: (value: number) => void;
  toggleBlackout: () => void;
  setAudioOn: (on: boolean) => void;
  setLocale: (locale: Locale) => void;
  setRackOpen: (open: boolean) => void;
  markCompleteIfReady: () => void;
};

function audio(s: GameState, fn: () => void) {
  if (s.audioOn) fn();
}

export const useGame = create<GameState & Actions>()((set, get) => ({
  phase: "title",
  missionId: "cue1",
  fixtures: [],
  cables: [],
  dimmerOutAngles: [0, 90, 180, 270, 0, 90],
  dimmerDmxAngle: 0,
  consoleDmxAngle: 0,
  faders: [0, 0, 0, 0, 0, 0],
  grandMaster: 0.8,
  blackout: false,
  selectedFixtureId: null,
  holding: null,
  pendingFrom: null,
  puzzle: null,
  completedMissions: [],
  audioOn: true,
  locale: "zh",
  rackOpen: false,

  hydratePrefs: () => {
    const prefs = loadSave();
    set({
      completedMissions: prefs.completedMissions,
      audioOn: prefs.audioOn,
      locale: prefs.locale,
    });
  },

  startMission: (id) => {
    const m = missionById(id);
    unlockAudio();
    set({
      phase: "play",
      missionId: id,
      fixtures: fixturesFor(id),
      cables: [],
      dimmerOutAngles: m.dimmerOutAngles,
      dimmerDmxAngle: m.dimmerDmxAngle,
      consoleDmxAngle: m.consoleDmxAngle,
      faders: [0, 0, 0, 0, 0, 0],
      grandMaster: 0.85,
      blackout: false,
      selectedFixtureId: null,
      holding: null,
      pendingFrom: null,
      puzzle: null,
      rackOpen: false,
    });
  },

  backToTitle: () => set({ phase: "title", holding: null, pendingFrom: null, puzzle: null }),

  hangFixture: (fixtureId, slot) => {
    const s = get();
    const occupant = s.fixtures.find((f) => f.hangSlot === slot);
    set({
      fixtures: s.fixtures.map((f) => {
        if (f.id === fixtureId) return { ...f, hangSlot: slot };
        if (occupant && f.id === occupant.id) return { ...f, hangSlot: null };
        return f;
      }),
      selectedFixtureId: fixtureId,
      holding: null,
    });
    audio(s, playClick);
  },

  unhangFixture: (fixtureId) => {
    const s = get();
    set({
      fixtures: s.fixtures.map((f) => (f.id === fixtureId ? { ...f, hangSlot: null } : f)),
      cables: s.cables.filter((c) => {
        const ids = [c.from, c.to]
          .filter((p) => p.type === "fixture-power")
          .map((p) => (p.type === "fixture-power" ? p.fixtureId : ""));
        return !ids.includes(fixtureId);
      }),
      selectedFixtureId: s.selectedFixtureId === fixtureId ? null : s.selectedFixtureId,
    });
  },

  selectFixture: (id) => set({ selectedFixtureId: id }),

  setAim: (fixtureId, pan, tilt) => {
    set({
      fixtures: get().fixtures.map((f) =>
        f.id === fixtureId
          ? { ...f, pan: Math.max(-1, Math.min(1, pan)), tilt: Math.max(-28, Math.min(36, tilt)) }
          : f,
      ),
    });
  },

  applyGel: (fixtureId, gelId) => {
    const s = get();
    set({
      fixtures: s.fixtures.map((f) => (f.id === fixtureId ? { ...f, gelId } : f)),
      holding: null,
    });
    audio(s, playClick);
  },

  setHolding: (h) => {
    unlockAudio();
    set({ holding: h, pendingFrom: h?.kind === "cable" ? get().pendingFrom : null });
    if (h === null) set({ pendingFrom: null });
  },

  clickPort: (ref) => {
    const s = get();
    if (s.puzzle) return null;

    if (s.pendingFrom) {
      if (samePort(s.pendingFrom, ref)) {
        set({ pendingFrom: null, holding: null });
        return null;
      }
      const kind = compatible(s.pendingFrom, ref);
      const holdingKind = s.holding?.kind === "cable" ? s.holding.cable : null;
      if (!kind) return "toast.incompatible";
      if (holdingKind && holdingKind !== kind) {
        return kind === "power" ? "toast.needPower" : "toast.needDmx";
      }
      if (portOccupied(s.cables, ref) || portOccupied(s.cables, s.pendingFrom)) {
        return "toast.occupied";
      }
      const fromAngle = socketAngle(s.pendingFrom, s);
      const toAngle = socketAngle(ref, s);
      const cable: Cable = {
        id: `c-${Date.now()}`,
        kind,
        from: s.pendingFrom,
        to: ref,
        fromPlugAngle: fromAngle,
        toPlugAngle: 0,
        fromSeated: true,
        toSeated: toAngle === 0,
      };
      const cables = [...s.cables, cable];
      if (cable.toSeated) {
        set({ cables, pendingFrom: null, holding: null, puzzle: null });
        audio(s, playSeat);
        return null;
      }
      set({ cables, pendingFrom: null, holding: null, puzzle: { cableId: cable.id } });
      audio(s, playClick);
      return null;
    }

    if (portOccupied(s.cables, ref)) {
      const cable = s.cables.find((c) => samePort(c.from, ref) || samePort(c.to, ref));
      if (cable) set({ cables: s.cables.filter((c) => c.id !== cable.id) });
      audio(s, playClick);
      return null;
    }

    if (s.holding?.kind !== "cable") {
      return "toast.pickCable";
    }

    const need =
      ref.type === "fixture-power" || ref.type === "dimmer-out"
        ? "power"
        : "dmx";
    if (s.holding.cable !== need) {
      return need === "power" ? "toast.needPower" : "toast.needDmx";
    }

    set({ pendingFrom: ref });
    audio(s, playClick);
    return null;
  },

  rotatePlug: () => {
    const s = get();
    if (!s.puzzle) return;
    const cable = s.cables.find((c) => c.id === s.puzzle?.cableId);
    if (!cable) return;
    const next: Angle = NEXT_ANGLE[cable.toPlugAngle];
    const target = socketAngle(cable.to, s);
    const seated = next === target;
    set({
      cables: s.cables.map((c) =>
        c.id === cable.id ? { ...c, toPlugAngle: next, toSeated: seated } : c,
      ),
      puzzle: seated ? null : s.puzzle,
    });
    if (seated) audio(s, playSeat);
    else audio(s, playClick);
  },

  cancelPuzzle: () => {
    const s = get();
    if (!s.puzzle) return;
    set({
      cables: s.cables.filter((c) => c.id !== s.puzzle?.cableId),
      puzzle: null,
    });
  },

  disconnectCable: (cableId) => {
    set({ cables: get().cables.filter((c) => c.id !== cableId) });
  },

  setFader: (index, value) => {
    const s = get();
    const prev = s.faders[index] ?? 0;
    const faders = s.faders.map((v, i) => (i === index ? value : v));
    set({ faders });
    if (prev < 0.08 && value >= 0.08 && s.grandMaster > 0.05 && !s.blackout) {
      audio(s, playStrike);
    }
  },

  setGrandMaster: (value) => set({ grandMaster: value }),

  toggleBlackout: () => set({ blackout: !get().blackout }),

  setAudioOn: (on) => {
    const next = { ...get(), audioOn: on };
    set({ audioOn: on });
    persist(next);
    if (on) unlockAudio();
  },

  setLocale: (locale) => {
    const next = { ...get(), locale };
    set({ locale });
    persist(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale === "zh" ? "zh-HK" : "en";
    }
  },

  setRackOpen: (open) => set({ rackOpen: open }),

  markCompleteIfReady: () => {
    const s = get();
    if (s.phase !== "play") return;
    if (!allObjectivesMet(s)) return;
    const completed = s.completedMissions.includes(s.missionId)
      ? s.completedMissions
      : [...s.completedMissions, s.missionId];
    const next = { ...s, phase: "complete" as const, completedMissions: completed };
    set({ phase: "complete", completedMissions: completed });
    persist(next);
    audio(s, playComplete);
  },
}));
