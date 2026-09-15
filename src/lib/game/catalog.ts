import type { Angle, FixtureKind } from "./types";

export const SLOT_COUNT = 6;
export const CHANNELS = 6;

export const SLOT_XS = [0.17, 0.306, 0.442, 0.558, 0.694, 0.83];
export const PIPE_Y = 0.145;
export const SINGER = { x: 0.5, y: 0.87, r: 0.1 };

export const NEXT_ANGLE: Record<Angle, Angle> = {
  0: 90,
  90: 180,
  180: 270,
  270: 0,
};

export const FIXTURES: Record<
  FixtureKind,
  {
    name: string;
    nameEn: string;
    blurb: string;
    spread: number;
    softness: number;
    sprite: string;
  }
> = {
  fresnel: {
    name: "菲涅爾",
    nameEn: "Fresnel",
    blurb: "柔邊面光，最適合打人",
    spread: 0.15,
    softness: 0.74,
    sprite: "/sprites/fresnel.png",
  },
  par: {
    name: "PAR 筒燈",
    nameEn: "PAR",
    blurb: "實光洗燈，光束較集中",
    spread: 0.11,
    softness: 0.36,
    sprite: "/sprites/par.png",
  },
  flood: {
    name: "泛光燈",
    nameEn: "Flood",
    blurb: "大面積均勻洗光",
    spread: 0.26,
    softness: 0.92,
    sprite: "/sprites/flood.png",
  },
  profile: {
    name: "造型燈",
    nameEn: "Profile",
    blurb: "硬邊特寫，對準要準",
    spread: 0.068,
    softness: 0.12,
    sprite: "/sprites/profile.png",
  },
};

export const GELS = [
  { id: "gold", name: "暖金", lee: "151", rgb: [255, 176, 82] as [number, number, number] },
  { id: "amber", name: "橙黃", lee: "101", rgb: [255, 196, 48] as [number, number, number] },
  { id: "ctb", name: "日光藍", lee: "201", rgb: [118, 176, 255] as [number, number, number] },
  { id: "red", name: "正紅", lee: "106", rgb: [255, 54, 42] as [number, number, number] },
  { id: "green", name: "葉綠", lee: "139", rgb: [46, 196, 92] as [number, number, number] },
  { id: "congo", name: "深藍", lee: "181", rgb: [48, 52, 186] as [number, number, number] },
] as const;

export type GelId = (typeof GELS)[number]["id"];

export function gelById(id: string | null) {
  if (!id) return null;
  return GELS.find((g) => g.id === id) ?? null;
}

export function portKey(ref: {
  type: string;
  fixtureId?: string;
  channel?: number;
}): string {
  if (ref.type === "fixture-power") return `fixture-power:${ref.fixtureId}`;
  if (ref.type === "dimmer-out") return `dimmer-out:${ref.channel}`;
  return ref.type;
}

export function samePort(
  a: { type: string; fixtureId?: string; channel?: number },
  b: { type: string; fixtureId?: string; channel?: number },
) {
  return portKey(a) === portKey(b);
}

export function socketAngle(
  ref: { type: string; fixtureId?: string; channel?: number },
  state: {
    fixtures: { id: string; powerInAngle: Angle }[];
    dimmerOutAngles: Angle[];
    dimmerDmxAngle: Angle;
    consoleDmxAngle: Angle;
  },
): Angle {
  if (ref.type === "fixture-power") {
    return state.fixtures.find((f) => f.id === ref.fixtureId)?.powerInAngle ?? 0;
  }
  if (ref.type === "dimmer-out") {
    return state.dimmerOutAngles[(ref.channel ?? 1) - 1] ?? 0;
  }
  if (ref.type === "dimmer-dmx") return state.dimmerDmxAngle;
  return state.consoleDmxAngle;
}
