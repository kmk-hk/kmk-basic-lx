export type Locale = "zh" | "en";

const zh = {
  "html.lang": "zh-HK",
  "title.kicker": "STAGE LIGHTING WORKSHOP",
  "title.hang": "掛燈",
  "title.lead":
    "將 Fresnel、PAR、Flood、Profile 掛上燈杆，用電源線同 DMX 接駁 Dimmer 同控制台。對準插頭角度、校燈、加 Gel，再推 fader 睇現場。",
  "audio.off": "關閉聲音",
  "audio.on": "開啟聲音",
  "lang.zh": "中",
  "lang.en": "EN",
  "lang.switch": "語言",

  "mission.cue1.title": "暖光人聲",
  "mission.cue1.blurb": "掛一支 Fresnel 做面光，駁通 Dimmer 同 DMX，加暖金 Gel，打中歌手。",
  "mission.cue1.hang": "將 Fresnel 掛上中間燈位",
  "mission.cue1.hang.hint": "從器材架拖到燈杆第 3 或 4 格",
  "mission.cue1.power": "電源駁去 Dimmer 第 1 路",
  "mission.cue1.power.hint": "拎電源線，先撳燈嘅電源位，再撳 Dimmer 1",
  "mission.cue1.dmx": "DMX 駁通控制台同 Dimmer",
  "mission.cue1.dmx.hint": "拎 DMX 線，駁控制台 OUT 同 Dimmer IN",
  "mission.cue1.gel": "加上暖金 Gel",
  "mission.cue1.gel.hint": "將暖金 Gel 拖到燈上",
  "mission.cue1.focus": "校角度打中歌手",
  "mission.cue1.focus.hint": "撳燈之後拖舞台上嘅光圈，或用水平／俯仰",
  "mission.cue1.up": "推起 Fader 1 同 Grand Master",
  "mission.cue1.up.hint": "控制台最左係 GM，第 1 條 fader 對 Dimmer 1",

  "mission.cue2.title": "冷暖洗光",
  "mission.cue2.blurb": "左右各掛一支 Flood，一邊暖一邊冷，分開兩個 channel。",
  "mission.cue2.hang-l": "左邊掛一支 Flood",
  "mission.cue2.hang-l.hint": "掛上燈杆最左兩格其中一格",
  "mission.cue2.hang-r": "右邊掛一支 Flood",
  "mission.cue2.hang-r.hint": "掛上燈杆最右兩格其中一格",
  "mission.cue2.gels": "一邊暖金／橙黃，一邊日光藍",
  "mission.cue2.gels.hint": "兩支燈用唔同色溫",
  "mission.cue2.patch": "駁去兩個唔同 Dimmer 路",
  "mission.cue2.patch.hint": "例如 2 同 3 路，記得轉插頭角度",
  "mission.cue2.dmx": "DMX 駁通",
  "mission.cue2.dmx.hint": "控制台 OUT → Dimmer IN",
  "mission.cue2.up": "兩路光都推到半滿以上",
  "mission.cue2.up.hint": "對應嘅 fader 同 GM 一齊推",

  "mission.cue3.title": "特寫加面光",
  "mission.cue3.blurb": "Profile 做特寫打實歌手，Fresnel 做面光，PAR 洗舞台。",
  "mission.cue3.profile": "掛上 Profile 並打中歌手",
  "mission.cue3.profile.hint": "造型燈光圈細，要慢慢校",
  "mission.cue3.face": "掛上 Fresnel 做面光",
  "mission.cue3.face.hint": "中間附近嘅燈位",
  "mission.cue3.wash": "掛上 PAR 洗舞台",
  "mission.cue3.wash.hint": "邊位都可以",
  "mission.cue3.patch3": "三支燈駁去三條唔同路",
  "mission.cue3.patch3.hint": "每支燈一個 dimmer channel",
  "mission.cue3.dmx": "DMX 駁通",
  "mission.cue3.dmx.hint": "控制台 OUT → Dimmer IN",
  "mission.cue3.look": "特寫同面光都亮起",
  "mission.cue3.look.hint": "Profile 同 Fresnel 對應 fader 推高",

  "mission.sandbox.title": "自由掛燈",
  "mission.sandbox.blurb": "全套器材任你接。掛、駁、校角度、加 Gel，再推 fader 睇效果。",

  "ui.leave": "離開",
  "ui.gear": "器材",
  "ui.close": "關閉",
  "ui.closeRack": "關閉器材架",
  "ui.rack": "器材架",
  "ui.fixtures": "燈具 · 拖去燈杆",
  "ui.cables": "線材 · 撳一下再駁插口",
  "ui.powerCable": "電源線",
  "ui.dmxCable": "DMX 線",
  "ui.gels": "Gel · 拖到燈上",
  "ui.dimmer": "六路調光器",
  "ui.pan": "水平",
  "ui.tilt": "俯仰",
  "ui.unhang": "拆下",
  "ui.clearGel": "除 Gel",
  "ui.openWhite": "原色",
  "ui.back": "返回",
  "ui.nextCue": "下一個 Cue",
  "ui.sandbox": "自由掛燈",
  "ui.completeKicker": "CUE COMPLETE",
  "ui.completeBody": "燈已經亮起。可以進入下一個 cue，或者再校一次呢個 look。",
  "ui.slot": "燈位 {n}",
  "ui.singer": "歌手",
  "ui.aimPool": "拖動光圈校角度",
  "ui.rotatePlug": "旋轉插頭",
  "ui.cancel": "取消",
  "ui.rotate90": "順時針轉 90°",
  "ui.plug": "插頭",
  "ui.socket": "插口",
  "ui.aligned": "對準",
  "ui.puzzlePower": "電源插頭角度",
  "ui.puzzleDmx": "DMX 插頭角度",
  "ui.puzzleHint": "插口方向唔同，轉到缺口對準先插入。",
  "hold.dmx": "拎住 DMX 線 · 撳控制台 DMX OUT 或 Dimmer DMX IN",
  "hold.power": "拎住電源線 · 撳燈嘅 PWR，再撳 Dimmer 路數",
  "hold.pending": "拉緊條線 · 撳另一個插口完成接駁",
  "hold.fixture": "拎住燈 · 撳燈杆上嘅燈位掛上",
  "hold.gel": "拎住 Gel · 撳已掛上嘅燈",
  "toast.incompatible": "呢兩端唔夾。電源線駁燈同 Dimmer，DMX 駁控制台同 Dimmer。",
  "toast.needPower": "呢度要用電源線。",
  "toast.needDmx": "呢度要用 DMX 線。",
  "toast.occupied": "呢個插口已經有線。",
  "toast.pickCable": "先從器材架拎條電源線或 DMX 線，再撳插口。",
  "fx.fresnel": "菲涅爾",
  "fx.fresnel.blurb": "柔邊面光，最適合打人",
  "fx.par": "PAR 筒燈",
  "fx.par.blurb": "實光洗燈，光束較集中",
  "fx.flood": "泛光燈",
  "fx.flood.blurb": "大面積均勻洗光",
  "fx.profile": "造型燈",
  "fx.profile.blurb": "硬邊特寫，對準要準",
  "gel.gold": "暖金",
  "gel.amber": "橙黃",
  "gel.ctb": "日光藍",
  "gel.red": "正紅",
  "gel.green": "葉綠",
  "gel.congo": "深藍",
} as const;

const en: Record<keyof typeof zh, string> = {
  "html.lang": "en",
  "title.kicker": "STAGE LIGHTING WORKSHOP",
  "title.hang": "Hang lights",
  "title.lead":
    "Hang Fresnels, PARs, Floods and Profiles on the bar. Patch power and DMX through the dimmer, line up the connectors, focus, add gel, then bring up the faders.",
  "audio.off": "Mute",
  "audio.on": "Unmute",
  "lang.zh": "中",
  "lang.en": "EN",
  "lang.switch": "Language",

  "mission.cue1.title": "Warm special",
  "mission.cue1.blurb": "Hang a Fresnel as a face light, patch dimmer and DMX, add gold gel, and hit the singer.",
  "mission.cue1.hang": "Hang the Fresnel on a centre slot",
  "mission.cue1.hang.hint": "Drag from the rack onto bar slot 3 or 4",
  "mission.cue1.power": "Patch power into dimmer 1",
  "mission.cue1.power.hint": "Take a power cable, tap the fixture PWR, then dimmer 1",
  "mission.cue1.dmx": "Run DMX from desk to dimmer",
  "mission.cue1.dmx.hint": "Take a DMX cable: console OUT to dimmer IN",
  "mission.cue1.gel": "Add gold gel",
  "mission.cue1.gel.hint": "Drop the gold gel onto the fixture",
  "mission.cue1.focus": "Focus onto the singer",
  "mission.cue1.focus.hint": "Select the lamp, then drag the pool or use pan / tilt",
  "mission.cue1.up": "Bring up fader 1 and Grand Master",
  "mission.cue1.up.hint": "GM is on the left; fader 1 feeds dimmer 1",

  "mission.cue2.title": "Warm / cool wash",
  "mission.cue2.blurb": "Hang a Flood left and right — one warm, one cool — on two channels.",
  "mission.cue2.hang-l": "Hang a Flood on the left",
  "mission.cue2.hang-l.hint": "Use one of the two leftmost slots",
  "mission.cue2.hang-r": "Hang a Flood on the right",
  "mission.cue2.hang-r.hint": "Use one of the two rightmost slots",
  "mission.cue2.gels": "Warm gold/amber on one, daylight blue on the other",
  "mission.cue2.gels.hint": "Two fixtures, two colour temperatures",
  "mission.cue2.patch": "Patch to two different dimmer channels",
  "mission.cue2.patch.hint": "Try 2 and 3 — rotate the plug to match",
  "mission.cue2.dmx": "DMX is live",
  "mission.cue2.dmx.hint": "Console OUT → dimmer IN",
  "mission.cue2.up": "Both looks above half",
  "mission.cue2.up.hint": "Push the patched faders and GM",

  "mission.cue3.title": "Special + face",
  "mission.cue3.blurb": "Profile as a special on the singer, Fresnel for face, PAR for wash.",
  "mission.cue3.profile": "Hang a Profile and hit the singer",
  "mission.cue3.profile.hint": "Tight beam — take your time aiming",
  "mission.cue3.face": "Hang a Fresnel as face light",
  "mission.cue3.face.hint": "Somewhere near centre",
  "mission.cue3.wash": "Hang a PAR as wash",
  "mission.cue3.wash.hint": "Any slot is fine",
  "mission.cue3.patch3": "Three lamps on three channels",
  "mission.cue3.patch3.hint": "One dimmer channel each",
  "mission.cue3.dmx": "DMX is live",
  "mission.cue3.dmx.hint": "Console OUT → dimmer IN",
  "mission.cue3.look": "Special and face are up",
  "mission.cue3.look.hint": "Push the Profile and Fresnel faders",

  "mission.sandbox.title": "Open hang",
  "mission.sandbox.blurb": "Full kit. Hang, patch, focus, gel, then ride the faders.",

  "ui.leave": "Leave",
  "ui.gear": "Gear",
  "ui.close": "Close",
  "ui.closeRack": "Close rack",
  "ui.rack": "Rack",
  "ui.fixtures": "Fixtures · drop on the bar",
  "ui.cables": "Cables · pick one, then tap ports",
  "ui.powerCable": "Power",
  "ui.dmxCable": "DMX",
  "ui.gels": "Gel · drop onto a hung lamp",
  "ui.dimmer": "6-way dimmer",
  "ui.pan": "Pan",
  "ui.tilt": "Tilt",
  "ui.unhang": "Strike",
  "ui.clearGel": "Clear gel",
  "ui.openWhite": "Open white",
  "ui.back": "Back",
  "ui.nextCue": "Next cue",
  "ui.sandbox": "Open hang",
  "ui.completeKicker": "CUE COMPLETE",
  "ui.completeBody": "The look is up. Jump to the next cue, or keep focusing this one.",
  "ui.slot": "Slot {n}",
  "ui.singer": "Singer",
  "ui.aimPool": "Drag the pool to focus",
  "ui.rotatePlug": "Rotate plug",
  "ui.cancel": "Cancel",
  "ui.rotate90": "Clockwise 90°",
  "ui.plug": "Plug",
  "ui.socket": "Socket",
  "ui.aligned": "lined up",
  "ui.puzzlePower": "Power plug angle",
  "ui.puzzleDmx": "DMX plug angle",
  "ui.puzzleHint": "The panel faces a different way — turn until the keyways match.",
  "hold.dmx": "Holding DMX · tap console DMX OUT or dimmer DMX IN",
  "hold.power": "Holding power · tap fixture PWR, then a dimmer channel",
  "hold.pending": "Cable live · tap the other port to finish",
  "hold.fixture": "Holding a fixture · tap a bar slot to hang",
  "hold.gel": "Holding gel · tap a hung fixture",
  "toast.incompatible": "Those ends don’t mate. Power goes fixture ↔ dimmer; DMX goes desk ↔ dimmer.",
  "toast.needPower": "That port needs a power cable.",
  "toast.needDmx": "That port needs a DMX cable.",
  "toast.occupied": "That socket already has a cable.",
  "toast.pickCable": "Pick a power or DMX cable from the rack first, then tap a port.",
  "fx.fresnel": "Fresnel",
  "fx.fresnel.blurb": "Soft-edge face light",
  "fx.par": "PAR can",
  "fx.par.blurb": "Punchy wash, tighter beam",
  "fx.flood": "Flood",
  "fx.flood.blurb": "Wide even wash",
  "fx.profile": "Profile",
  "fx.profile.blurb": "Hard-edge special — aim it",
  "gel.gold": "Gold",
  "gel.amber": "Amber",
  "gel.ctb": "Daylight",
  "gel.red": "Primary red",
  "gel.green": "Leaf green",
  "gel.congo": "Congo blue",
};

export type MsgKey = keyof typeof zh;

const tables: Record<Locale, Record<MsgKey, string>> = { zh, en };

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "zh";
  try {
    const raw = localStorage.getItem("hang-patch-v1");
    if (raw) {
      const p = JSON.parse(raw) as { locale?: string };
      if (p.locale === "en" || p.locale === "zh") return p.locale;
    }
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || "zh").toLowerCase();
  return nav.startsWith("zh") ? "zh" : "en";
}

export function t(locale: Locale, key: MsgKey, vars?: Record<string, string | number>) {
  let s = tables[locale][key] ?? tables.zh[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  }
  return s;
}

export function missionTitle(locale: Locale, id: string) {
  return t(locale, `mission.${id}.title` as MsgKey);
}

export function missionBlurb(locale: Locale, id: string) {
  return t(locale, `mission.${id}.blurb` as MsgKey);
}

export function objectiveLabel(locale: Locale, missionId: string, objId: string) {
  return t(locale, `mission.${missionId}.${objId}` as MsgKey);
}

export function objectiveHint(locale: Locale, missionId: string, objId: string) {
  return t(locale, `mission.${missionId}.${objId}.hint` as MsgKey);
}
