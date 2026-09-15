import { patchChannel, powerChannel, singerCoverage } from "./lighting";
import type { GameState, Mission } from "./types";

export const MISSIONS: Mission[] = [
  {
    id: "cue1",
    index: "CUE 01",
    title: "暖光人聲",
    titleEn: "Warm special",
    blurb: "掛一支 Fresnel 做面光，駁通 Dimmer 同 DMX，加暖金 Gel，打中歌手。",
    fixtures: [{ id: "face", kind: "fresnel", powerInAngle: 90 }],
    dimmerOutAngles: [180, 0, 90, 270, 0, 90],
    dimmerDmxAngle: 180,
    consoleDmxAngle: 0,
    objectives: [
      { id: "hang", label: "將 Fresnel 掛上中間燈位", hint: "從器材架拖到燈杆第 3 或 4 格" },
      { id: "power", label: "電源駁去 Dimmer 第 1 路", hint: "拎電源線，先撳燈嘅電源位，再撳 Dimmer 1" },
      { id: "dmx", label: "DMX 駁通控制台同 Dimmer", hint: "拎 DMX 線，駁控制台 OUT 同 Dimmer IN" },
      { id: "gel", label: "加上暖金 Gel", hint: "將暖金 Gel 拖到燈上" },
      { id: "focus", label: "校角度打中歌手", hint: "撳燈之後拖舞台上嘅光圈，或用水平／俯仰" },
      { id: "up", label: "推起 Fader 1 同 Grand Master", hint: "控制台最左係 GM，第 1 條 fader 對 Dimmer 1" },
    ],
  },
  {
    id: "cue2",
    index: "CUE 02",
    title: "冷暖洗光",
    titleEn: "Warm / cool wash",
    blurb: "左右各掛一支 Flood，一邊暖一邊冷，分開兩個 channel。",
    fixtures: [
      { id: "wash-l", kind: "flood", powerInAngle: 0 },
      { id: "wash-r", kind: "flood", powerInAngle: 270 },
    ],
    dimmerOutAngles: [90, 90, 180, 0, 270, 0],
    dimmerDmxAngle: 90,
    consoleDmxAngle: 0,
    objectives: [
      { id: "hang-l", label: "左邊掛一支 Flood", hint: "掛上燈杆最左兩格其中一格" },
      { id: "hang-r", label: "右邊掛一支 Flood", hint: "掛上燈杆最右兩格其中一格" },
      { id: "gels", label: "一邊暖金／橙黃，一邊日光藍", hint: "兩支燈用唔同色溫" },
      { id: "patch", label: "駁去兩個唔同 Dimmer 路", hint: "例如 2 同 3 路，記得轉插頭角度" },
      { id: "dmx", label: "DMX 駁通", hint: "控制台 OUT → Dimmer IN" },
      { id: "up", label: "兩路光都推到半滿以上", hint: "對應嘅 fader 同 GM 一齊推" },
    ],
  },
  {
    id: "cue3",
    index: "CUE 03",
    title: "特寫加面光",
    titleEn: "Special + face",
    blurb: "Profile 做特寫打實歌手，Fresnel 做面光，PAR 洗舞台。",
    fixtures: [
      { id: "special", kind: "profile", powerInAngle: 180 },
      { id: "face", kind: "fresnel", powerInAngle: 90 },
      { id: "wash", kind: "par", powerInAngle: 0 },
    ],
    dimmerOutAngles: [90, 180, 270, 0, 90, 180],
    dimmerDmxAngle: 270,
    consoleDmxAngle: 0,
    objectives: [
      { id: "profile", label: "掛上 Profile 並打中歌手", hint: "造型燈光圈細，要慢慢校" },
      { id: "face", label: "掛上 Fresnel 做面光", hint: "中間附近嘅燈位" },
      { id: "wash", label: "掛上 PAR 洗舞台", hint: "邊位都可以" },
      { id: "patch3", label: "三支燈駁去三條唔同路", hint: "每支燈一個 dimmer channel" },
      { id: "dmx", label: "DMX 駁通", hint: "控制台 OUT → Dimmer IN" },
      { id: "look", label: "特寫同面光都亮起", hint: "Profile 同 Fresnel 對應 fader 推高" },
    ],
  },
  {
    id: "sandbox",
    index: "OPEN",
    title: "自由掛燈",
    titleEn: "Sandbox",
    blurb: "全套器材任你接。掛、駁、校角度、加 Gel，再推 fader 睇效果。",
    sandbox: true,
    fixtures: [
      { id: "fresnel-a", kind: "fresnel", powerInAngle: 0 },
      { id: "fresnel-b", kind: "fresnel", powerInAngle: 90 },
      { id: "par-a", kind: "par", powerInAngle: 180 },
      { id: "par-b", kind: "par", powerInAngle: 270 },
      { id: "flood-a", kind: "flood", powerInAngle: 90 },
      { id: "flood-b", kind: "flood", powerInAngle: 0 },
      { id: "profile-a", kind: "profile", powerInAngle: 180 },
      { id: "profile-b", kind: "profile", powerInAngle: 270 },
    ],
    dimmerOutAngles: [0, 90, 180, 270, 90, 180],
    dimmerDmxAngle: 90,
    consoleDmxAngle: 0,
    objectives: [],
  },
];

export function missionById(id: string) {
  return MISSIONS.find((m) => m.id === id) ?? MISSIONS[0]!;
}

export function objectiveMet(state: GameState, objectiveId: string): boolean {
  const hung = state.fixtures.filter((f) => f.hangSlot !== null);
  const byId = Object.fromEntries(state.fixtures.map((f) => [f.id, f]));

  switch (objectiveId) {
    case "hang": {
      const f = byId.face;
      return !!f && (f.hangSlot === 2 || f.hangSlot === 3);
    }
    case "power":
      return powerChannel(state, "face") === 1;
    case "dmx":
      return state.cables.some((c) => c.kind === "dmx" && c.fromSeated && c.toSeated);
    case "gel":
      return byId.face?.gelId === "gold";
    case "focus":
      return !!byId.face && singerCoverage(byId.face) >= 0.45;
    case "up": {
      if (patchChannel(state, "face") !== 1 || state.blackout) return false;
      return state.faders[0] >= 0.6 && state.grandMaster >= 0.6;
    }
    case "hang-l":
      return hung.some((f) => f.kind === "flood" && f.hangSlot !== null && f.hangSlot <= 1);
    case "hang-r":
      return hung.some((f) => f.kind === "flood" && f.hangSlot !== null && f.hangSlot >= 4);
    case "gels": {
      const gels = hung.filter((f) => f.kind === "flood").map((f) => f.gelId);
      const warm = gels.some((g) => g === "gold" || g === "amber");
      const cool = gels.some((g) => g === "ctb" || g === "congo");
      return warm && cool;
    }
    case "patch": {
      const chans = hung
        .filter((f) => f.kind === "flood")
        .map((f) => patchChannel(state, f.id))
        .filter((c): c is number => c !== null);
      return new Set(chans).size >= 2;
    }
    case "profile": {
      const f = byId.special;
      return !!f && f.hangSlot !== null && singerCoverage(f) >= 0.4;
    }
    case "face":
      return !!byId.face && byId.face.hangSlot !== null;
    case "wash":
      return !!byId.wash && byId.wash.hangSlot !== null;
    case "patch3": {
      const ids = ["special", "face", "wash"];
      const chans = ids.map((id) => patchChannel(state, id));
      return chans.every((c) => c !== null) && new Set(chans).size === 3;
    }
    case "look": {
      const spec = byId.special;
      const face = byId.face;
      if (!spec || !face) return false;
      const chS = patchChannel(state, spec.id);
      const chF = patchChannel(state, face.id);
      if (!chS || !chF || state.blackout) return false;
      return (
        state.faders[chS - 1] * state.grandMaster >= 0.5 &&
        state.faders[chF - 1] * state.grandMaster >= 0.35
      );
    }
    default:
      return false;
  }
}

export function allObjectivesMet(state: GameState) {
  const m = missionById(state.missionId);
  if (m.sandbox) return false;
  return m.objectives.every((o) => objectiveMet(state, o.id));
}
