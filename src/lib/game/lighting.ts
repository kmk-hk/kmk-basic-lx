import { FIXTURES, SINGER, SLOT_XS, gelById } from "./catalog";
import type { Cable, Fixture, GameState, PortRef } from "./types";

export function cableSeated(c: Cable) {
  return c.fromSeated && c.toSeated;
}

export function isDmxLive(state: Pick<GameState, "cables">) {
  return state.cables.some((c) => c.kind === "dmx" && cableSeated(c));
}

function otherEnd(c: Cable, pred: (p: PortRef) => boolean): PortRef | null {
  if (pred(c.from)) return c.to;
  if (pred(c.to)) return c.from;
  return null;
}

export function powerChannel(
  state: Pick<GameState, "cables">,
  fixtureId: string,
): number | null {
  for (const c of state.cables) {
    if (c.kind !== "power" || !cableSeated(c)) continue;
    const dimmer = otherEnd(
      c,
      (p) => p.type === "fixture-power" && p.fixtureId === fixtureId,
    );
    if (dimmer?.type === "dimmer-out") return dimmer.channel;
  }
  return null;
}

export function patchChannel(
  state: Pick<GameState, "cables">,
  fixtureId: string,
): number | null {
  if (!isDmxLive(state)) return null;
  return powerChannel(state, fixtureId);
}

export function fixtureLevel(state: GameState, fixture: Fixture) {
  if (fixture.hangSlot === null) return 0;
  const ch = patchChannel(state, fixture.id);
  if (!ch) return 0;
  if (state.blackout) return 0;
  return Math.max(0, Math.min(1, state.faders[ch - 1] * state.grandMaster));
}

export function poolFor(fixture: Fixture) {
  const spec = FIXTURES[fixture.kind];
  const slotX = fixture.hangSlot === null ? 0.5 : SLOT_XS[fixture.hangSlot]!;
  const poolX = slotX + fixture.pan * 0.34;
  const poolY = 0.84 + fixture.tilt * 0.0018;
  const r = spec.spread * (1 + Math.abs(fixture.tilt) * 0.006);
  return { x: poolX, y: poolY, r, slotX };
}

export function singerCoverage(fixture: Fixture) {
  if (fixture.hangSlot === null) return 0;
  const pool = poolFor(fixture);
  const d = Math.hypot(pool.x - SINGER.x, pool.y - SINGER.y);
  const overlap = 1 - d / (pool.r + SINGER.r);
  return Math.max(0, Math.min(1, overlap));
}

export function beamRgb(fixture: Fixture, level: number): [number, number, number] {
  const t = Math.pow(level, 1.65);
  const warm: [number, number, number] = [
    255 * t,
    (132 + 84 * level) * t,
    (52 + 96 * level) * t,
  ];
  const gel = gelById(fixture.gelId);
  if (!gel) return warm;
  return [
    (warm[0] * gel.rgb[0]) / 255,
    (warm[1] * gel.rgb[1]) / 255,
    (warm[2] * gel.rgb[2]) / 255,
  ];
}

export function occupiedPorts(cables: Cable[]): Set<string> {
  const s = new Set<string>();
  for (const c of cables) {
    if (!c.fromSeated && !c.toSeated) continue;
    const key = (p: PortRef) =>
      p.type === "fixture-power"
        ? `fixture-power:${p.fixtureId}`
        : p.type === "dimmer-out"
          ? `dimmer-out:${p.channel}`
          : p.type;
    if (c.fromSeated) s.add(key(c.from));
    if (c.toSeated) s.add(key(c.to));
    if (c.fromSeated || c.toSeated) {
      s.add(key(c.from));
      s.add(key(c.to));
    }
  }
  return s;
}

export function portOccupied(cables: Cable[], ref: PortRef) {
  const key =
    ref.type === "fixture-power"
      ? `fixture-power:${ref.fixtureId}`
      : ref.type === "dimmer-out"
        ? `dimmer-out:${ref.channel}`
        : ref.type;
  return occupiedPorts(cables).has(key);
}

export function compatible(a: PortRef, b: PortRef): "power" | "dmx" | null {
  const types = new Set([a.type, b.type]);
  if (types.has("fixture-power") && types.has("dimmer-out")) return "power";
  if (types.has("console-dmx") && types.has("dimmer-dmx")) return "dmx";
  return null;
}
