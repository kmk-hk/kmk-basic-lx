import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as RotateCw, c as ChevronDown, l as Check, n as VolumeX, o as Plug, r as Volume2, s as Package, t as X, u as Cable } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BDxgt0J5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SLOT_XS = [
	.17,
	.306,
	.442,
	.558,
	.694,
	.83
];
var PIPE_Y = .145;
var SINGER = {
	x: .5,
	y: .87,
	r: .1
};
var NEXT_ANGLE = {
	0: 90,
	90: 180,
	180: 270,
	270: 0
};
var FIXTURES = {
	fresnel: {
		name: "菲涅爾",
		nameEn: "Fresnel",
		blurb: "柔邊面光，最適合打人",
		spread: .15,
		softness: .74,
		sprite: "/sprites/fresnel.png"
	},
	par: {
		name: "PAR 筒燈",
		nameEn: "PAR",
		blurb: "實光洗燈，光束較集中",
		spread: .11,
		softness: .36,
		sprite: "/sprites/par.png"
	},
	flood: {
		name: "泛光燈",
		nameEn: "Flood",
		blurb: "大面積均勻洗光",
		spread: .26,
		softness: .92,
		sprite: "/sprites/flood.png"
	},
	profile: {
		name: "造型燈",
		nameEn: "Profile",
		blurb: "硬邊特寫，對準要準",
		spread: .068,
		softness: .12,
		sprite: "/sprites/profile.png"
	}
};
var GELS = [
	{
		id: "gold",
		name: "暖金",
		lee: "151",
		rgb: [
			255,
			176,
			82
		]
	},
	{
		id: "amber",
		name: "橙黃",
		lee: "101",
		rgb: [
			255,
			196,
			48
		]
	},
	{
		id: "ctb",
		name: "日光藍",
		lee: "201",
		rgb: [
			118,
			176,
			255
		]
	},
	{
		id: "red",
		name: "正紅",
		lee: "106",
		rgb: [
			255,
			54,
			42
		]
	},
	{
		id: "green",
		name: "葉綠",
		lee: "139",
		rgb: [
			46,
			196,
			92
		]
	},
	{
		id: "congo",
		name: "深藍",
		lee: "181",
		rgb: [
			48,
			52,
			186
		]
	}
];
function gelById(id) {
	if (!id) return null;
	return GELS.find((g) => g.id === id) ?? null;
}
function portKey(ref) {
	if (ref.type === "fixture-power") return `fixture-power:${ref.fixtureId}`;
	if (ref.type === "dimmer-out") return `dimmer-out:${ref.channel}`;
	return ref.type;
}
function samePort(a, b) {
	return portKey(a) === portKey(b);
}
function socketAngle(ref, state) {
	if (ref.type === "fixture-power") return state.fixtures.find((f) => f.id === ref.fixtureId)?.powerInAngle ?? 0;
	if (ref.type === "dimmer-out") return state.dimmerOutAngles[(ref.channel ?? 1) - 1] ?? 0;
	if (ref.type === "dimmer-dmx") return state.dimmerDmxAngle;
	return state.consoleDmxAngle;
}
function cableSeated(c) {
	return c.fromSeated && c.toSeated;
}
function isDmxLive(state) {
	return state.cables.some((c) => c.kind === "dmx" && cableSeated(c));
}
function otherEnd(c, pred) {
	if (pred(c.from)) return c.to;
	if (pred(c.to)) return c.from;
	return null;
}
function powerChannel(state, fixtureId) {
	for (const c of state.cables) {
		if (c.kind !== "power" || !cableSeated(c)) continue;
		const dimmer = otherEnd(c, (p) => p.type === "fixture-power" && p.fixtureId === fixtureId);
		if (dimmer?.type === "dimmer-out") return dimmer.channel;
	}
	return null;
}
function patchChannel(state, fixtureId) {
	if (!isDmxLive(state)) return null;
	return powerChannel(state, fixtureId);
}
function fixtureLevel(state, fixture) {
	if (fixture.hangSlot === null) return 0;
	const ch = patchChannel(state, fixture.id);
	if (!ch) return 0;
	if (state.blackout) return 0;
	return Math.max(0, Math.min(1, state.faders[ch - 1] * state.grandMaster));
}
function poolFor(fixture) {
	const spec = FIXTURES[fixture.kind];
	const slotX = fixture.hangSlot === null ? .5 : SLOT_XS[fixture.hangSlot];
	return {
		x: slotX + fixture.pan * .34,
		y: .84 + fixture.tilt * .0018,
		r: spec.spread * (1 + Math.abs(fixture.tilt) * .006),
		slotX
	};
}
function singerCoverage(fixture) {
	if (fixture.hangSlot === null) return 0;
	const pool = poolFor(fixture);
	const overlap = 1 - Math.hypot(pool.x - SINGER.x, pool.y - SINGER.y) / (pool.r + SINGER.r);
	return Math.max(0, Math.min(1, overlap));
}
function beamRgb(fixture, level) {
	const t = Math.pow(level, 1.65);
	const warm = [
		255 * t,
		(132 + 84 * level) * t,
		(52 + 96 * level) * t
	];
	const gel = gelById(fixture.gelId);
	if (!gel) return warm;
	return [
		warm[0] * gel.rgb[0] / 255,
		warm[1] * gel.rgb[1] / 255,
		warm[2] * gel.rgb[2] / 255
	];
}
function occupiedPorts(cables) {
	const s = /* @__PURE__ */ new Set();
	for (const c of cables) {
		if (!c.fromSeated && !c.toSeated) continue;
		const key = (p) => p.type === "fixture-power" ? `fixture-power:${p.fixtureId}` : p.type === "dimmer-out" ? `dimmer-out:${p.channel}` : p.type;
		if (c.fromSeated) s.add(key(c.from));
		if (c.toSeated) s.add(key(c.to));
		if (c.fromSeated || c.toSeated) {
			s.add(key(c.from));
			s.add(key(c.to));
		}
	}
	return s;
}
function portOccupied(cables, ref) {
	const key = ref.type === "fixture-power" ? `fixture-power:${ref.fixtureId}` : ref.type === "dimmer-out" ? `dimmer-out:${ref.channel}` : ref.type;
	return occupiedPorts(cables).has(key);
}
function compatible(a, b) {
	const types = /* @__PURE__ */ new Set([a.type, b.type]);
	if (types.has("fixture-power") && types.has("dimmer-out")) return "power";
	if (types.has("console-dmx") && types.has("dimmer-dmx")) return "dmx";
	return null;
}
var MISSIONS = [
	{
		id: "cue1",
		index: "CUE 01",
		title: "暖光人聲",
		titleEn: "Warm special",
		blurb: "掛一支 Fresnel 做面光，駁通 Dimmer 同 DMX，加暖金 Gel，打中歌手。",
		fixtures: [{
			id: "face",
			kind: "fresnel",
			powerInAngle: 90
		}],
		dimmerOutAngles: [
			180,
			0,
			90,
			270,
			0,
			90
		],
		dimmerDmxAngle: 180,
		consoleDmxAngle: 0,
		objectives: [
			{
				id: "hang",
				label: "將 Fresnel 掛上中間燈位",
				hint: "從器材架拖到燈杆第 3 或 4 格"
			},
			{
				id: "power",
				label: "電源駁去 Dimmer 第 1 路",
				hint: "拎電源線，先撳燈嘅電源位，再撳 Dimmer 1"
			},
			{
				id: "dmx",
				label: "DMX 駁通控制台同 Dimmer",
				hint: "拎 DMX 線，駁控制台 OUT 同 Dimmer IN"
			},
			{
				id: "gel",
				label: "加上暖金 Gel",
				hint: "將暖金 Gel 拖到燈上"
			},
			{
				id: "focus",
				label: "校角度打中歌手",
				hint: "撳燈之後拖舞台上嘅光圈，或用水平／俯仰"
			},
			{
				id: "up",
				label: "推起 Fader 1 同 Grand Master",
				hint: "控制台最左係 GM，第 1 條 fader 對 Dimmer 1"
			}
		]
	},
	{
		id: "cue2",
		index: "CUE 02",
		title: "冷暖洗光",
		titleEn: "Warm / cool wash",
		blurb: "左右各掛一支 Flood，一邊暖一邊冷，分開兩個 channel。",
		fixtures: [{
			id: "wash-l",
			kind: "flood",
			powerInAngle: 0
		}, {
			id: "wash-r",
			kind: "flood",
			powerInAngle: 270
		}],
		dimmerOutAngles: [
			90,
			90,
			180,
			0,
			270,
			0
		],
		dimmerDmxAngle: 90,
		consoleDmxAngle: 0,
		objectives: [
			{
				id: "hang-l",
				label: "左邊掛一支 Flood",
				hint: "掛上燈杆最左兩格其中一格"
			},
			{
				id: "hang-r",
				label: "右邊掛一支 Flood",
				hint: "掛上燈杆最右兩格其中一格"
			},
			{
				id: "gels",
				label: "一邊暖金／橙黃，一邊日光藍",
				hint: "兩支燈用唔同色溫"
			},
			{
				id: "patch",
				label: "駁去兩個唔同 Dimmer 路",
				hint: "例如 2 同 3 路，記得轉插頭角度"
			},
			{
				id: "dmx",
				label: "DMX 駁通",
				hint: "控制台 OUT → Dimmer IN"
			},
			{
				id: "up",
				label: "兩路光都推到半滿以上",
				hint: "對應嘅 fader 同 GM 一齊推"
			}
		]
	},
	{
		id: "cue3",
		index: "CUE 03",
		title: "特寫加面光",
		titleEn: "Special + face",
		blurb: "Profile 做特寫打實歌手，Fresnel 做面光，PAR 洗舞台。",
		fixtures: [
			{
				id: "special",
				kind: "profile",
				powerInAngle: 180
			},
			{
				id: "face",
				kind: "fresnel",
				powerInAngle: 90
			},
			{
				id: "wash",
				kind: "par",
				powerInAngle: 0
			}
		],
		dimmerOutAngles: [
			90,
			180,
			270,
			0,
			90,
			180
		],
		dimmerDmxAngle: 270,
		consoleDmxAngle: 0,
		objectives: [
			{
				id: "profile",
				label: "掛上 Profile 並打中歌手",
				hint: "造型燈光圈細，要慢慢校"
			},
			{
				id: "face",
				label: "掛上 Fresnel 做面光",
				hint: "中間附近嘅燈位"
			},
			{
				id: "wash",
				label: "掛上 PAR 洗舞台",
				hint: "邊位都可以"
			},
			{
				id: "patch3",
				label: "三支燈駁去三條唔同路",
				hint: "每支燈一個 dimmer channel"
			},
			{
				id: "dmx",
				label: "DMX 駁通",
				hint: "控制台 OUT → Dimmer IN"
			},
			{
				id: "look",
				label: "特寫同面光都亮起",
				hint: "Profile 同 Fresnel 對應 fader 推高"
			}
		]
	},
	{
		id: "sandbox",
		index: "OPEN",
		title: "自由掛燈",
		titleEn: "Sandbox",
		blurb: "全套器材任你接。掛、駁、校角度、加 Gel，再推 fader 睇效果。",
		sandbox: true,
		fixtures: [
			{
				id: "fresnel-a",
				kind: "fresnel",
				powerInAngle: 0
			},
			{
				id: "fresnel-b",
				kind: "fresnel",
				powerInAngle: 90
			},
			{
				id: "par-a",
				kind: "par",
				powerInAngle: 180
			},
			{
				id: "par-b",
				kind: "par",
				powerInAngle: 270
			},
			{
				id: "flood-a",
				kind: "flood",
				powerInAngle: 90
			},
			{
				id: "flood-b",
				kind: "flood",
				powerInAngle: 0
			},
			{
				id: "profile-a",
				kind: "profile",
				powerInAngle: 180
			},
			{
				id: "profile-b",
				kind: "profile",
				powerInAngle: 270
			}
		],
		dimmerOutAngles: [
			0,
			90,
			180,
			270,
			90,
			180
		],
		dimmerDmxAngle: 90,
		consoleDmxAngle: 0,
		objectives: []
	}
];
function missionById(id) {
	return MISSIONS.find((m) => m.id === id) ?? MISSIONS[0];
}
function objectiveMet(state, objectiveId) {
	const hung = state.fixtures.filter((f) => f.hangSlot !== null);
	const byId = Object.fromEntries(state.fixtures.map((f) => [f.id, f]));
	switch (objectiveId) {
		case "hang": {
			const f = byId.face;
			return !!f && (f.hangSlot === 2 || f.hangSlot === 3);
		}
		case "power": return powerChannel(state, "face") === 1;
		case "dmx": return state.cables.some((c) => c.kind === "dmx" && c.fromSeated && c.toSeated);
		case "gel": return byId.face?.gelId === "gold";
		case "focus": return !!byId.face && singerCoverage(byId.face) >= .45;
		case "up":
			if (patchChannel(state, "face") !== 1 || state.blackout) return false;
			return state.faders[0] >= .6 && state.grandMaster >= .6;
		case "hang-l": return hung.some((f) => f.kind === "flood" && f.hangSlot !== null && f.hangSlot <= 1);
		case "hang-r": return hung.some((f) => f.kind === "flood" && f.hangSlot !== null && f.hangSlot >= 4);
		case "gels": {
			const gels = hung.filter((f) => f.kind === "flood").map((f) => f.gelId);
			const warm = gels.some((g) => g === "gold" || g === "amber");
			const cool = gels.some((g) => g === "ctb" || g === "congo");
			return warm && cool;
		}
		case "patch": {
			const chans = hung.filter((f) => f.kind === "flood").map((f) => patchChannel(state, f.id)).filter((c) => c !== null);
			return new Set(chans).size >= 2;
		}
		case "profile": {
			const f = byId.special;
			return !!f && f.hangSlot !== null && singerCoverage(f) >= .4;
		}
		case "face": return !!byId.face && byId.face.hangSlot !== null;
		case "wash": return !!byId.wash && byId.wash.hangSlot !== null;
		case "patch3": {
			const chans = [
				"special",
				"face",
				"wash"
			].map((id) => patchChannel(state, id));
			return chans.every((c) => c !== null) && new Set(chans).size === 3;
		}
		case "look": {
			const spec = byId.special;
			const face = byId.face;
			if (!spec || !face) return false;
			const chS = patchChannel(state, spec.id);
			const chF = patchChannel(state, face.id);
			if (!chS || !chF || state.blackout) return false;
			return state.faders[chS - 1] * state.grandMaster >= .5 && state.faders[chF - 1] * state.grandMaster >= .35;
		}
		default: return false;
	}
}
function allObjectivesMet(state) {
	const m = missionById(state.missionId);
	if (m.sandbox) return false;
	return m.objectives.every((o) => objectiveMet(state, o.id));
}
var tables = {
	zh: {
		"html.lang": "zh-HK",
		"title.kicker": "STAGE LIGHTING WORKSHOP",
		"title.hang": "掛燈",
		"title.lead": "將 Fresnel、PAR、Flood、Profile 掛上燈杆，用電源線同 DMX 接駁 Dimmer 同控制台。對準插頭角度、校燈、加 Gel，再推 fader 睇現場。",
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
		"gel.congo": "深藍"
	},
	en: {
		"html.lang": "en",
		"title.kicker": "STAGE LIGHTING WORKSHOP",
		"title.hang": "Hang lights",
		"title.lead": "Hang Fresnels, PARs, Floods and Profiles on the bar. Patch power and DMX through the dimmer, line up the connectors, focus, add gel, then bring up the faders.",
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
		"gel.congo": "Congo blue"
	}
};
function detectLocale() {
	if (typeof window === "undefined") return "zh";
	try {
		const raw = localStorage.getItem("hang-patch-v1");
		if (raw) {
			const p = JSON.parse(raw);
			if (p.locale === "en" || p.locale === "zh") return p.locale;
		}
	} catch {}
	return (navigator.language || "zh").toLowerCase().startsWith("zh") ? "zh" : "en";
}
function t(locale, key, vars) {
	let s = tables[locale][key] ?? tables.zh[key] ?? key;
	if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
	return s;
}
function missionTitle(locale, id) {
	return t(locale, `mission.${id}.title`);
}
function missionBlurb(locale, id) {
	return t(locale, `mission.${id}.blurb`);
}
function objectiveLabel(locale, missionId, objId) {
	return t(locale, `mission.${missionId}.${objId}`);
}
function objectiveHint(locale, missionId, objId) {
	return t(locale, `mission.${missionId}.${objId}.hint`);
}
var ctx = null;
var master = null;
function ac() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		ctx = new AudioContext();
		master = ctx.createGain();
		master.gain.value = .22;
		master.connect(ctx.destination);
	}
	return ctx;
}
function unlockAudio() {
	const c = ac();
	if (c?.state === "suspended") c.resume();
}
function envGain(duration, peak) {
	const c = ac();
	if (!c || !master) return null;
	const g = c.createGain();
	g.gain.setValueAtTime(1e-4, c.currentTime);
	g.gain.exponentialRampToValueAtTime(peak, c.currentTime + .012);
	g.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + duration);
	g.connect(master);
	return g;
}
function playClick() {
	const c = ac();
	const g = envGain(.05, .08);
	if (!c || !g) return;
	const o = c.createOscillator();
	o.type = "square";
	o.frequency.value = 1640;
	o.connect(g);
	o.start();
	o.stop(c.currentTime + .05);
}
function playSeat() {
	const c = ac();
	const g = envGain(.12, .16);
	if (!c || !g) return;
	const o = c.createOscillator();
	o.type = "triangle";
	o.frequency.setValueAtTime(220, c.currentTime);
	o.frequency.exponentialRampToValueAtTime(90, c.currentTime + .1);
	o.connect(g);
	o.start();
	o.stop(c.currentTime + .12);
}
function playStrike() {
	const c = ac();
	const g = envGain(.35, .1);
	if (!c || !g) return;
	const o = c.createOscillator();
	o.type = "sawtooth";
	o.frequency.value = 70;
	const f = c.createBiquadFilter();
	f.type = "lowpass";
	f.frequency.value = 420;
	o.connect(f).connect(g);
	o.start();
	o.stop(c.currentTime + .35);
}
function playComplete() {
	const c = ac();
	if (!c || !master) return;
	[
		392,
		494,
		587
	].forEach((freq, i) => {
		const g = c.createGain();
		const t = c.currentTime + i * .12;
		g.gain.setValueAtTime(1e-4, t);
		g.gain.exponentialRampToValueAtTime(.09, t + .03);
		g.gain.exponentialRampToValueAtTime(1e-4, t + .4);
		g.connect(master);
		const o = c.createOscillator();
		o.type = "sine";
		o.frequency.value = freq;
		o.connect(g);
		o.start(t);
		o.stop(t + .42);
	});
}
var SAVE_KEY = "hang-patch-v1";
function loadSave() {
	if (typeof window === "undefined") return {
		completedMissions: [],
		audioOn: true,
		locale: "zh"
	};
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return {
			completedMissions: [],
			audioOn: true,
			locale: detectLocale()
		};
		const p = JSON.parse(raw);
		return {
			completedMissions: p.completedMissions ?? [],
			audioOn: p.audioOn ?? true,
			locale: p.locale === "en" || p.locale === "zh" ? p.locale : detectLocale()
		};
	} catch {
		return {
			completedMissions: [],
			audioOn: true,
			locale: detectLocale()
		};
	}
}
function persist(s) {
	if (typeof window === "undefined") return;
	localStorage.setItem(SAVE_KEY, JSON.stringify({
		completedMissions: s.completedMissions,
		audioOn: s.audioOn,
		locale: s.locale
	}));
}
function fixturesFor(missionId) {
	return missionById(missionId).fixtures.map((f) => ({
		id: f.id,
		kind: f.kind,
		hangSlot: null,
		tilt: 6,
		pan: 0,
		gelId: null,
		powerInAngle: f.powerInAngle
	}));
}
function audio(s, fn) {
	if (s.audioOn) fn();
}
var useGame = create()((set, get) => ({
	phase: "title",
	missionId: "cue1",
	fixtures: [],
	cables: [],
	dimmerOutAngles: [
		0,
		90,
		180,
		270,
		0,
		90
	],
	dimmerDmxAngle: 0,
	consoleDmxAngle: 0,
	faders: [
		0,
		0,
		0,
		0,
		0,
		0
	],
	grandMaster: .8,
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
			locale: prefs.locale
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
			faders: [
				0,
				0,
				0,
				0,
				0,
				0
			],
			grandMaster: .85,
			blackout: false,
			selectedFixtureId: null,
			holding: null,
			pendingFrom: null,
			puzzle: null,
			rackOpen: false
		});
	},
	backToTitle: () => set({
		phase: "title",
		holding: null,
		pendingFrom: null,
		puzzle: null
	}),
	hangFixture: (fixtureId, slot) => {
		const s = get();
		const occupant = s.fixtures.find((f) => f.hangSlot === slot);
		set({
			fixtures: s.fixtures.map((f) => {
				if (f.id === fixtureId) return {
					...f,
					hangSlot: slot
				};
				if (occupant && f.id === occupant.id) return {
					...f,
					hangSlot: null
				};
				return f;
			}),
			selectedFixtureId: fixtureId,
			holding: null
		});
		audio(s, playClick);
	},
	unhangFixture: (fixtureId) => {
		const s = get();
		set({
			fixtures: s.fixtures.map((f) => f.id === fixtureId ? {
				...f,
				hangSlot: null
			} : f),
			cables: s.cables.filter((c) => {
				return ![c.from, c.to].filter((p) => p.type === "fixture-power").map((p) => p.type === "fixture-power" ? p.fixtureId : "").includes(fixtureId);
			}),
			selectedFixtureId: s.selectedFixtureId === fixtureId ? null : s.selectedFixtureId
		});
	},
	selectFixture: (id) => set({ selectedFixtureId: id }),
	setAim: (fixtureId, pan, tilt) => {
		set({ fixtures: get().fixtures.map((f) => f.id === fixtureId ? {
			...f,
			pan: Math.max(-1, Math.min(1, pan)),
			tilt: Math.max(-28, Math.min(36, tilt))
		} : f) });
	},
	applyGel: (fixtureId, gelId) => {
		const s = get();
		set({
			fixtures: s.fixtures.map((f) => f.id === fixtureId ? {
				...f,
				gelId
			} : f),
			holding: null
		});
		audio(s, playClick);
	},
	setHolding: (h) => {
		unlockAudio();
		set({
			holding: h,
			pendingFrom: h?.kind === "cable" ? get().pendingFrom : null
		});
		if (h === null) set({ pendingFrom: null });
	},
	clickPort: (ref) => {
		const s = get();
		if (s.puzzle) return null;
		if (s.pendingFrom) {
			if (samePort(s.pendingFrom, ref)) {
				set({
					pendingFrom: null,
					holding: null
				});
				return null;
			}
			const kind = compatible(s.pendingFrom, ref);
			const holdingKind = s.holding?.kind === "cable" ? s.holding.cable : null;
			if (!kind) return "toast.incompatible";
			if (holdingKind && holdingKind !== kind) return kind === "power" ? "toast.needPower" : "toast.needDmx";
			if (portOccupied(s.cables, ref) || portOccupied(s.cables, s.pendingFrom)) return "toast.occupied";
			const fromAngle = socketAngle(s.pendingFrom, s);
			const toAngle = socketAngle(ref, s);
			const cable = {
				id: `c-${Date.now()}`,
				kind,
				from: s.pendingFrom,
				to: ref,
				fromPlugAngle: fromAngle,
				toPlugAngle: 0,
				fromSeated: true,
				toSeated: toAngle === 0
			};
			const cables = [...s.cables, cable];
			if (cable.toSeated) {
				set({
					cables,
					pendingFrom: null,
					holding: null,
					puzzle: null
				});
				audio(s, playSeat);
				return null;
			}
			set({
				cables,
				pendingFrom: null,
				holding: null,
				puzzle: { cableId: cable.id }
			});
			audio(s, playClick);
			return null;
		}
		if (portOccupied(s.cables, ref)) {
			const cable = s.cables.find((c) => samePort(c.from, ref) || samePort(c.to, ref));
			if (cable) set({ cables: s.cables.filter((c) => c.id !== cable.id) });
			audio(s, playClick);
			return null;
		}
		if (s.holding?.kind !== "cable") return "toast.pickCable";
		const need = ref.type === "fixture-power" || ref.type === "dimmer-out" ? "power" : "dmx";
		if (s.holding.cable !== need) return need === "power" ? "toast.needPower" : "toast.needDmx";
		set({ pendingFrom: ref });
		audio(s, playClick);
		return null;
	},
	rotatePlug: () => {
		const s = get();
		if (!s.puzzle) return;
		const cable = s.cables.find((c) => c.id === s.puzzle?.cableId);
		if (!cable) return;
		const next = NEXT_ANGLE[cable.toPlugAngle];
		const seated = next === socketAngle(cable.to, s);
		set({
			cables: s.cables.map((c) => c.id === cable.id ? {
				...c,
				toPlugAngle: next,
				toSeated: seated
			} : c),
			puzzle: seated ? null : s.puzzle
		});
		if (seated) audio(s, playSeat);
		else audio(s, playClick);
	},
	cancelPuzzle: () => {
		const s = get();
		if (!s.puzzle) return;
		set({
			cables: s.cables.filter((c) => c.id !== s.puzzle?.cableId),
			puzzle: null
		});
	},
	disconnectCable: (cableId) => {
		set({ cables: get().cables.filter((c) => c.id !== cableId) });
	},
	setFader: (index, value) => {
		const s = get();
		const prev = s.faders[index] ?? 0;
		set({ faders: s.faders.map((v, i) => i === index ? value : v) });
		if (prev < .08 && value >= .08 && s.grandMaster > .05 && !s.blackout) audio(s, playStrike);
	},
	setGrandMaster: (value) => set({ grandMaster: value }),
	toggleBlackout: () => set({ blackout: !get().blackout }),
	setAudioOn: (on) => {
		const next = {
			...get(),
			audioOn: on
		};
		set({ audioOn: on });
		persist(next);
		if (on) unlockAudio();
	},
	setLocale: (locale) => {
		const next = {
			...get(),
			locale
		};
		set({ locale });
		persist(next);
		if (typeof document !== "undefined") document.documentElement.lang = locale === "zh" ? "zh-HK" : "en";
	},
	setRackOpen: (open) => set({ rackOpen: open }),
	markCompleteIfReady: () => {
		const s = get();
		if (s.phase !== "play") return;
		if (!allObjectivesMet(s)) return;
		const completed = s.completedMissions.includes(s.missionId) ? s.completedMissions : [...s.completedMissions, s.missionId];
		const next = {
			...s,
			phase: "complete",
			completedMissions: completed
		};
		set({
			phase: "complete",
			completedMissions: completed
		});
		persist(next);
		audio(s, playComplete);
	}
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg border border-border hover:bg-surface",
			ghost: "text-fg hover:bg-surface-2",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Badge({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-sm border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] font-medium tracking-wide text-muted", className),
		...props
	});
}
function LangToggle() {
	const locale = useGame((s) => s.locale);
	const setLocale = useGame((s) => s.setLocale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex rounded-md border border-border bg-surface-2 p-0.5",
		role: "group",
		"aria-label": t(locale, "lang.switch"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setLocale("zh"),
			className: cn("h-8 min-w-9 rounded-sm px-2 font-mono text-xs", locale === "zh" ? "bg-accent text-accent-fg" : "text-muted"),
			children: t(locale, "lang.zh")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setLocale("en"),
			className: cn("h-8 min-w-9 rounded-sm px-2 font-mono text-xs", locale === "en" ? "bg-accent text-accent-fg" : "text-muted"),
			children: t(locale, "lang.en")
		})]
	});
}
function TitleScreen() {
	const startMission = useGame((s) => s.startMission);
	const completed = useGame((s) => s.completedMissions);
	const audioOn = useGame((s) => s.audioOn);
	const setAudioOn = useGame((s) => s.setAudioOn);
	const locale = useGame((s) => s.locale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-dvh flex-col overflow-x-hidden overflow-y-auto bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/stage.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-40",
				crossOrigin: "anonymous"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/80 to-bg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute left-1/2 top-[18%] h-[55%] w-[28%] -translate-x-1/2 opacity-50",
				style: {
					background: "linear-gradient(180deg, rgb(232 201 160 / 0.35), rgb(232 201 160 / 0.05) 70%, transparent)",
					clipPath: "polygon(46% 0, 54% 0, 88% 100%, 12% 100%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex items-center justify-between gap-2 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "HANG NIGHT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setAudioOn(!audioOn),
						"aria-label": audioOn ? t(locale, "audio.off") : t(locale, "audio.on"),
						children: audioOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 pb-16 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-[0.28em] text-muted",
						children: t(locale, "title.kicker")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-5xl leading-none tracking-tight text-balance sm:text-7xl",
						children: "HANG & PATCH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-3xl text-accent",
						children: t(locale, "title.hang")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted sm:text-base",
						children: t(locale, "title.lead")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: MISSIONS.map((m) => {
							const done = completed.includes(m.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => startMission(m.id),
								className: cn("w-full rounded-lg border border-border bg-surface/90 p-4 text-left transition-transform duration-[var(--motion-quick)] hover:-translate-y-0.5"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[11px] tracking-[0.16em] text-muted",
											children: m.index
										}), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 font-display text-2xl text-fg",
										children: missionTitle(locale, m.id)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-snug text-muted",
										children: missionBlurb(locale, m.id)
									})
								]
							}) }, m.id);
						})
					})
				]
			})
		]
	});
}
function MissionBar() {
	const missionId = useGame((s) => s.missionId);
	const backToTitle = useGame((s) => s.backToTitle);
	const setRackOpen = useGame((s) => s.setRackOpen);
	const locale = useGame((s) => s.locale);
	const state = useGame();
	const [open, setOpen] = (0, import_react.useState)(false);
	const mission = missionById(missionId);
	const doneCount = mission.objectives.filter((o) => objectiveMet(state, o.id)).length;
	const nextHint = mission.objectives.find((o) => !objectiveMet(state, o.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "z-20 border-b border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 px-3 py-2 sm:px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: backToTitle,
					children: t(locale, "ui.leave")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: mission.index }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-lg leading-none text-fg sm:text-xl",
							children: missionTitle(locale, mission.id)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden truncate text-xs text-muted sm:block",
						children: nextHint ? objectiveHint(locale, mission.id, nextHint.id) : missionBlurb(locale, mission.id)
					})]
				}),
				!mission.sandbox ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "hidden items-center gap-1 font-mono text-xs text-muted sm:flex",
					onClick: () => setOpen((v) => !v),
					children: [
						doneCount,
						"/",
						mission.objectives.length,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 transition-transform", open && "rotate-180") })
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-muted",
					children: "SANDBOX"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "sm",
					className: "lg:hidden",
					onClick: () => setRackOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4" }), t(locale, "ui.gear")]
				})
			]
		}), open && !mission.sandbox ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-1 border-t border-border px-3 py-2 sm:grid-cols-2 sm:px-4",
			children: mission.objectives.map((o) => {
				const ok = objectiveMet(state, o.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex items-start gap-2 text-xs", ok ? "text-fg" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("mt-0.5 size-3.5 shrink-0", ok ? "text-accent" : "opacity-25") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-fg",
						children: objectiveLabel(locale, mission.id, o.id)
					}), !ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-muted",
						children: objectiveHint(locale, mission.id, o.id)
					}) : null] })]
				}, o.id);
			})
		}) : null]
	});
}
function Port({ port, angle, live, pending, occupied, label, size = "md", onClick }) {
	const dmx = port.type === "dimmer-dmx" || port.type === "console-dmx";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"data-port": portKey(port),
		onClick,
		className: cn("relative flex flex-col items-center gap-0.5 rounded-md p-1 text-left", pending && "ring-2 ring-accent"),
		"aria-label": label ?? portKey(port),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("relative grid place-items-center rounded-full border bg-bg", size === "md" ? "size-8" : "size-7", occupied ? "border-accent" : "border-border", live && "shadow-[0_0_10px_var(--color-tungsten)]"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("block rounded-full", dmx ? "size-4 border-2 border-muted" : "size-3 bg-surface-2 ring-1 ring-border"),
				style: { transform: `rotate(${angle}deg)` },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute left-1/2 top-0 -translate-x-1/2 bg-accent", dmx ? "h-1.5 w-1" : "h-1.5 w-0.5") })
			})
		}), label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[9px] leading-none tracking-wide text-muted",
			children: label
		}) : null]
	});
}
function Rack({ onPickFixture, onPickGel }) {
	const fixtures = useGame((s) => s.fixtures);
	const holding = useGame((s) => s.holding);
	const setHolding = useGame((s) => s.setHolding);
	const clickPort = useGame((s) => s.clickPort);
	const pendingFrom = useGame((s) => s.pendingFrom);
	const cables = useGame((s) => s.cables);
	const dimmerOutAngles = useGame((s) => s.dimmerOutAngles);
	const dimmerDmxAngle = useGame((s) => s.dimmerDmxAngle);
	const rackOpen = useGame((s) => s.rackOpen);
	const setRackOpen = useGame((s) => s.setRackOpen);
	const locale = useGame((s) => s.locale);
	const toast = (msg) => {
		if (msg) window.dispatchEvent(new CustomEvent("hang-toast", { detail: msg }));
	};
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-[0.18em] text-muted",
				children: "RACK"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-fg",
				children: t(locale, "ui.rack")
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				className: "lg:hidden",
				onClick: () => setRackOpen(false),
				children: t(locale, "ui.close")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs text-muted",
			children: t(locale, "ui.fixtures")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-2",
			children: fixtures.filter((f) => f.hangSlot === null).map((f) => {
				const spec = FIXTURES[f.kind];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onPointerDown: () => onPickFixture(f.id),
					className: cn("flex flex-col items-center rounded-md border border-border bg-surface-2 px-2 py-2", holding?.kind === "fixture" && holding.fixtureId === f.id && "ring-2 ring-accent"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: spec.sprite,
						alt: "",
						className: "h-14 w-14 object-contain",
						crossOrigin: "anonymous",
						draggable: false
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-fg",
						children: t(locale, `fx.${f.kind}`)
					})]
				}, f.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 mt-4 text-xs text-muted",
			children: t(locale, "ui.cables")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setHolding(holding?.kind === "cable" && holding.cable === "power" ? null : {
					kind: "cable",
					cable: "power"
				}),
				className: cn("flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm", holding?.kind === "cable" && holding.cable === "power" && "ring-2 ring-accent"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plug, { className: "size-4 text-muted" }), t(locale, "ui.powerCable")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setHolding(holding?.kind === "cable" && holding.cable === "dmx" ? null : {
					kind: "cable",
					cable: "dmx"
				}),
				className: cn("flex items-center gap-2 rounded-md border border-border bg-surface-2 px-3 py-2 text-sm", holding?.kind === "cable" && holding.cable === "dmx" && "ring-2 ring-accent"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, { className: "size-4 text-muted" }), t(locale, "ui.dmxCable")]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 mt-4 text-xs text-muted",
			children: t(locale, "ui.gels")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-1.5",
			children: GELS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onPointerDown: () => onPickGel(g.id),
				className: cn("flex flex-col items-center gap-1 rounded-md border border-border bg-surface-2 px-1 py-2", holding?.kind === "gel" && holding.gelId === g.id && "ring-2 ring-accent"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-7 w-full rounded-sm ring-1 ring-black/40",
						style: { background: `rgb(${g.rgb.join(",")})` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[9px] text-muted",
						children: ["L", g.lee]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-fg",
						children: t(locale, `gel.${g.id}`)
					})
				]
			}, g.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-lg border border-border bg-surface-2 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.16em] text-muted",
						children: "DIMMER PACK"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg",
						children: t(locale, "ui.dimmer")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "DMX" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex justify-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Port, {
						port: { type: "dimmer-dmx" },
						angle: dimmerDmxAngle,
						pending: pendingFrom?.type === "dimmer-dmx",
						occupied: portOccupied(cables, { type: "dimmer-dmx" }),
						label: "DMX IN",
						onClick: () => toast(clickPort({ type: "dimmer-dmx" }))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-6 gap-1",
					children: dimmerOutAngles.map((angle, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Port, {
						port: {
							type: "dimmer-out",
							channel: i + 1
						},
						angle,
						pending: pendingFrom?.type === "dimmer-out" && pendingFrom.channel === i + 1,
						occupied: portOccupied(cables, {
							type: "dimmer-out",
							channel: i + 1
						}),
						label: `${i + 1}`,
						size: "sm",
						onClick: () => toast(clickPort({
							type: "dimmer-out",
							channel: i + 1
						}))
					}, i))
				})
			]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: "hidden min-h-0 w-[280px] shrink-0 overflow-y-auto border-r border-border bg-surface p-3 lg:block",
		children: body
	}), rackOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 lg:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-bg/70",
			"aria-label": t(locale, "ui.closeRack"),
			onClick: () => setRackOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "absolute inset-y-0 left-0 w-[min(100%,320px)] overflow-y-auto border-r border-border bg-surface p-3 shadow-2xl",
			children: body
		})]
	}) : null] });
}
function BeamsCanvas() {
	const canvasRef = (0, import_react.useRef)(null);
	const fixtures = useGame((s) => s.fixtures);
	const cables = useGame((s) => s.cables);
	const faders = useGame((s) => s.faders);
	const grandMaster = useGame((s) => s.grandMaster);
	const blackout = useGame((s) => s.blackout);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		let last = performance.now();
		const parent = canvas.parentElement;
		const loop = (now) => {
			Math.min((now - last) / 1e3, .1);
			last = now;
			const w = parent?.clientWidth ?? 800;
			const h = parent?.clientHeight ?? 450;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
				canvas.width = Math.floor(w * dpr);
				canvas.height = Math.floor(h * dpr);
				canvas.style.width = `${w}px`;
				canvas.style.height = `${h}px`;
			}
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			const state = useGame.getState();
			ctx.globalCompositeOperation = "screen";
			for (const fixture of state.fixtures) {
				if (fixture.hangSlot === null) continue;
				const level = fixtureLevel(state, fixture);
				if (level < .01) continue;
				const [r, g, b] = beamRgb(fixture, level * (1 + Math.sin(now * .055 + fixture.hangSlot * 1.7) * .018));
				const pool = poolFor(fixture);
				const ox = SLOT_XS[fixture.hangSlot] * w;
				const oy = (PIPE_Y + .07) * h;
				const px = pool.x * w;
				const py = pool.y * h;
				const rad = pool.r * w;
				const half = rad * .85;
				const left = px - half;
				const right = px + half;
				const cone = ctx.createLinearGradient(ox, oy, px, py);
				cone.addColorStop(0, `rgba(${r},${g},${b},${.22 + level * .28})`);
				cone.addColorStop(.55, `rgba(${r},${g},${b},${.1 + level * .12})`);
				cone.addColorStop(1, `rgba(${r},${g},${b},0)`);
				ctx.fillStyle = cone;
				ctx.beginPath();
				ctx.moveTo(ox, oy);
				ctx.lineTo(left, py);
				ctx.quadraticCurveTo(px, py + rad * .35, right, py);
				ctx.closePath();
				ctx.fill();
				const glow = ctx.createRadialGradient(px, py, 0, px, py, rad);
				glow.addColorStop(0, `rgba(${r},${g},${b},${.35 + level * .4})`);
				glow.addColorStop(.45, `rgba(${r},${g},${b},${.12 * level})`);
				glow.addColorStop(1, "rgba(0,0,0,0)");
				ctx.fillStyle = glow;
				ctx.beginPath();
				ctx.ellipse(px, py, rad, rad * .38, 0, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = `rgba(${r},${g},${b},${.45 + level * .4})`;
				ctx.beginPath();
				ctx.arc(ox, oy, 5 + level * 6, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalCompositeOperation = "source-over";
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [
		fixtures,
		cables,
		faders,
		grandMaster,
		blackout
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "pointer-events-none absolute inset-0 z-10 h-full w-full",
		"aria-hidden": true
	});
}
function Inspector() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto absolute bottom-3 right-3 z-20 w-[min(100%-1.5rem,280px)] rounded-lg border border-border bg-surface/95 p-3 shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-[0.16em] text-muted",
					children: spec.nameEn.toUpperCase()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg leading-none text-fg",
					children: t(locale, `fx.${fixture.kind}`)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "size-8",
					onClick: () => selectFixture(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs text-muted",
				children: t(locale, `fx.${fixture.kind}.blurb`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mb-3 grid grid-cols-3 gap-2 font-mono text-[10px] text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "CHANNEL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-fg",
						children: ch ?? "—"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "LEVEL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "text-fg",
						children: [Math.round(level * 100), "%"]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "COVER" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "text-fg",
						children: [Math.round(cover * 100), "%"]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mb-2 block text-xs text-muted",
				children: [t(locale, "ui.pan"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: -1,
					max: 1,
					step: .01,
					value: fixture.pan,
					onChange: (e) => setAim(fixture.id, Number(e.target.value), fixture.tilt),
					className: "mt-1 w-full accent-[var(--color-accent)]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mb-3 block text-xs text-muted",
				children: [t(locale, "ui.tilt"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: -28,
					max: 36,
					step: .5,
					value: fixture.tilt,
					onChange: (e) => setAim(fixture.id, fixture.pan, Number(e.target.value)),
					className: "mt-1 w-full accent-[var(--color-accent)]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between gap-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "Gel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex items-center gap-2 text-fg",
					children: gel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-3 rounded-sm ring-1 ring-border",
						style: { background: `rgb(${gel.rgb.join(",")})` }
					}), t(locale, `gel.${gel.id}`)] }) : t(locale, "ui.openWhite")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [gel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					className: "flex-1",
					onClick: () => applyGel(fixture.id, null),
					children: t(locale, "ui.clearGel")
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					className: "flex-1",
					onClick: () => unhangFixture(fixture.id),
					children: t(locale, "ui.unhang")
				})]
			})
		]
	});
}
function StageView({ hoverSlot, setHoverSlot, holding }) {
	const rootRef = (0, import_react.useRef)(null);
	const fixtures = useGame((s) => s.fixtures);
	const selected = useGame((s) => s.selectedFixtureId);
	const selectFixture = useGame((s) => s.selectFixture);
	const hangFixture = useGame((s) => s.hangFixture);
	const applyGel = useGame((s) => s.applyGel);
	const clickPort = useGame((s) => s.clickPort);
	const pendingFrom = useGame((s) => s.pendingFrom);
	const cables = useGame((s) => s.cables);
	useGame((s) => s.faders);
	useGame((s) => s.grandMaster);
	useGame((s) => s.blackout);
	const state = useGame.getState();
	const setAim = useGame((s) => s.setAim);
	const locale = useGame((s) => s.locale);
	const slotFromPoint = (clientX, clientY) => {
		const el = rootRef.current;
		if (!el) return null;
		const r = el.getBoundingClientRect();
		const x = (clientX - r.left) / r.width;
		if ((clientY - r.top) / r.height > .32) return null;
		let best = 0;
		let dist = 99;
		for (let i = 0; i < 6; i++) {
			const d = Math.abs(x - SLOT_XS[i]);
			if (d < dist) {
				dist = d;
				best = i;
			}
		}
		return dist < .1 ? best : null;
	};
	const onPointerMove = (e) => {
		if (holding?.kind === "fixture") setHoverSlot(slotFromPoint(e.clientX, e.clientY));
	};
	const onPointerUp = (e) => {
		if (holding?.kind === "fixture") {
			const slot = slotFromPoint(e.clientX, e.clientY);
			if (slot !== null) hangFixture(holding.fixtureId, slot);
		}
		setHoverSlot(null);
	};
	const hung = fixtures.filter((f) => f.hangSlot !== null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: rootRef,
		className: "relative min-h-0 flex-1 overflow-hidden bg-bg",
		onPointerMove,
		onPointerUp,
		onPointerLeave: () => setHoverSlot(null),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/stage.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover",
				crossOrigin: "anonymous",
				draggable: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/55" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeamsCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-[8%] right-[8%] z-20 h-2.5 rounded-sm",
				style: {
					top: `${PIPE_Y * 100}%`,
					background: "linear-gradient(180deg, #8a8a90, #3a3a40 40%, #c4c4ca 50%, #2e2e32)",
					boxShadow: "0 8px 16px rgb(0 0 0 / 0.45)"
				}
			}),
			SLOT_XS.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": t(locale, "ui.slot", { n: i + 1 }),
				className: cn("absolute z-20 flex size-11 -translate-x-1/2 items-center justify-center rounded-md border border-dashed", hoverSlot === i ? "border-accent bg-accent/15" : "border-fg/20"),
				style: {
					left: `${x * 100}%`,
					top: `${PIPE_Y * 100 - 1.2}%`
				},
				onClick: () => {
					if (holding?.kind === "fixture") hangFixture(holding.fixtureId, i);
				}
			}, i)),
			hung.map((f) => {
				const spec = FIXTURES[f.kind];
				const x = SLOT_XS[f.hangSlot];
				const live = fixtureLevel(state, f) > .05;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("absolute z-20 flex -translate-x-1/2 flex-col items-center", selected === f.id && "drop-shadow-[0_0_12px_var(--color-accent)]"),
					style: {
						left: `${x * 100}%`,
						top: `${PIPE_Y * 100 - 1}%`
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							selectFixture(f.id);
							if (holding && holding.kind === "gel") applyGel(f.id, holding.gelId);
						},
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: spec.sprite,
							alt: "",
							className: "h-20 w-20 object-contain sm:h-24 sm:w-24",
							style: { transform: `rotate(${f.tilt * .35}deg)` },
							crossOrigin: "anonymous",
							draggable: false
						}), f.gelId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute bottom-3 left-1/2 size-3 -translate-x-1/2 rounded-[2px] ring-1 ring-black/50",
							style: { background: `rgb(${gelById(f.gelId)?.rgb.join(",") ?? "255,255,255"})` }
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Port, {
						port: {
							type: "fixture-power",
							fixtureId: f.id
						},
						angle: f.powerInAngle,
						live,
						pending: pendingFrom?.type === "fixture-power" && pendingFrom.fixtureId === f.id,
						occupied: portOccupied(cables, {
							type: "fixture-power",
							fixtureId: f.id
						}),
						label: "PWR",
						size: "sm",
						onClick: () => {
							const msg = clickPort({
								type: "fixture-power",
								fixtureId: f.id
							});
							if (msg) window.dispatchEvent(new CustomEvent("hang-toast", { detail: msg }));
						}
					})]
				}, f.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/sprites/singer.png",
				alt: t(locale, "ui.singer"),
				className: "pointer-events-none absolute z-10 h-[36%] w-auto object-contain",
				style: {
					left: `${SINGER.x * 100}%`,
					top: `${SINGER.y * 100}%`,
					transform: "translate(-50%, -88%)",
					filter: `brightness(${.55 + hung.reduce((a, f) => a + fixtureLevel(state, f) * .5, 0)})`
				},
				crossOrigin: "anonymous",
				draggable: false
			}),
			selected ? (() => {
				const f = hung.find((x) => x.id === selected);
				if (!f) return null;
				const pool = poolFor(f);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute z-20 size-16 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border border-accent/70 bg-accent/10",
					style: {
						left: `${pool.x * 100}%`,
						top: `${pool.y * 100}%`
					},
					onPointerDown: (e) => {
						e.currentTarget.setPointerCapture(e.pointerId);
					},
					onPointerMove: (e) => {
						if (!e.currentTarget.hasPointerCapture(e.pointerId) || !rootRef.current) return;
						const r = rootRef.current.getBoundingClientRect();
						const nx = (e.clientX - r.left) / r.width;
						const ny = (e.clientY - r.top) / r.height;
						const pan = (nx - SLOT_XS[f.hangSlot]) / .34;
						const tilt = (ny - .84) / .0018;
						setAim(f.id, pan, tilt);
					},
					"aria-label": t(locale, "ui.aimPool")
				});
			})() : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {})
		]
	});
}
function Fader({ value, onChange, label, hot, accent = "channel" }) {
	const trackRef = (0, import_react.useRef)(null);
	const setFromY = (0, import_react.useCallback)((clientY) => {
		const el = trackRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const v = 1 - (clientY - r.top) / r.height;
		onChange(Math.max(0, Math.min(1, v)));
	}, [onChange]);
	const onPointerDown = (e) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		setFromY(e.clientY);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-11 flex-col items-center gap-1.5 sm:w-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("size-1.5 rounded-full", hot ? "bg-live shadow-[0_0_8px_var(--color-live)]" : "bg-border"),
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: trackRef,
				className: "relative h-24 w-8 touch-none sm:h-[7.5rem]",
				onPointerDown,
				onPointerMove: (e) => {
					if (e.currentTarget.hasPointerCapture(e.pointerId)) setFromY(e.clientY);
				},
				role: "slider",
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuenow": Math.round(value * 100),
				"aria-label": label,
				tabIndex: 0,
				onKeyDown: (e) => {
					if (e.key === "ArrowUp") onChange(Math.min(1, value + .05));
					if (e.key === "ArrowDown") onChange(Math.max(0, value - .05));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-[11px] inset-y-0 rounded-sm bg-bg shadow-inner ring-1 ring-border" }),
					Array.from({ length: 11 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute right-0 h-px w-1.5 bg-border",
						style: { top: `${i * 10}%` }
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("absolute left-1/2 z-10 h-[18px] w-7 -translate-x-1/2 -translate-y-1/2 rounded-[3px] shadow-md ring-1 ring-black/40", accent === "master" ? "bg-live" : "bg-accent"),
						style: { top: `${(1 - value) * 100}%` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-black/25" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[11px] tabular-nums text-muted",
				children: label
			})
		]
	});
}
function Console() {
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
	const toast = (msg) => {
		if (msg) window.dispatchEvent(new CustomEvent("hang-toast", { detail: msg }));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "z-20 border-t border-border bg-surface px-3 py-2 sm:px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl items-end gap-3 overflow-x-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fader, {
					value: blackout ? 0 : grandMaster,
					onChange: setGrandMaster,
					label: "GM",
					accent: "master",
					hot: !blackout && grandMaster > .05
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end gap-1 sm:gap-2",
					children: faders.map((v, i) => {
						const patched = fixtures.some((f) => patchChannel(state, f.id) === i + 1);
						const hot = !blackout && patched && v * grandMaster > .05;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fader, {
							value: v,
							onChange: (n) => setFader(i, n),
							label: `${i + 1}`,
							hot
						}, i);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex shrink-0 flex-col items-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Port, {
						port: { type: "console-dmx" },
						angle: consoleDmxAngle,
						pending: pendingFrom?.type === "console-dmx",
						occupied: portOccupied(cables, { type: "console-dmx" }),
						label: "DMX OUT",
						onClick: () => toast(clickPort({ type: "console-dmx" }))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: blackout ? "default" : "secondary",
						size: "sm",
						onClick: toggleBlackout,
						children: "BLACKOUT"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden font-mono text-[10px] tracking-[0.14em] text-muted sm:block",
					children: "6CH DESK"
				})]
			})]
		})
	});
}
function centerOf(el) {
	if (!el) return null;
	const r = el.getBoundingClientRect();
	return {
		x: r.left + r.width / 2,
		y: r.top + r.height / 2
	};
}
function findPort(ref) {
	return document.querySelector(`[data-port="${portKey(ref)}"]`);
}
function CablesOverlay({ pointer }) {
	const cables = useGame((s) => s.cables);
	const pendingFrom = useGame((s) => s.pendingFrom);
	const [, bump] = (0, import_react.useState)(0);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		const onResize = () => bump((n) => n + 1);
		window.addEventListener("resize", onResize);
		const id = window.setInterval(onResize, 400);
		return () => {
			window.removeEventListener("resize", onResize);
			window.clearInterval(id);
		};
	}, []);
	if (!mounted) return null;
	const path = (a, b) => {
		const mx = (a.x + b.x) / 2;
		const my = Math.max(a.y, b.y) + 28;
		return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "pointer-events-none fixed inset-0 z-30 h-full w-full",
		"aria-hidden": true,
		children: [cables.map((c) => {
			const a = centerOf(findPort(c.from));
			const b = centerOf(findPort(c.to));
			if (!a || !b) return null;
			const live = cableSeated(c);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: path(a, b),
				fill: "none",
				stroke: c.kind === "dmx" ? "var(--color-accent)" : "var(--color-muted)",
				strokeWidth: live ? 3.5 : 2,
				strokeDasharray: live ? void 0 : "5 5",
				strokeLinecap: "round",
				opacity: live ? .9 : .45
			}, c.id);
		}), pendingFrom && pointer ? (() => {
			const a = centerOf(findPort(pendingFrom));
			if (!a) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: path(a, pointer),
				fill: "none",
				stroke: "var(--color-accent)",
				strokeWidth: 2.5,
				strokeDasharray: "6 5",
				strokeLinecap: "round",
				opacity: .8
			});
		})() : null]
	});
}
function ConnectorPuzzle() {
	const puzzle = useGame((s) => s.puzzle);
	const cable = useGame((s) => s.cables.find((c) => c.id === s.puzzle?.cableId));
	const rotatePlug = useGame((s) => s.rotatePlug);
	const cancelPuzzle = useGame((s) => s.cancelPuzzle);
	const dimmerOutAngles = useGame((s) => s.dimmerOutAngles);
	const dimmerDmxAngle = useGame((s) => s.dimmerDmxAngle);
	const consoleDmxAngle = useGame((s) => s.consoleDmxAngle);
	const fixtures = useGame((s) => s.fixtures);
	const locale = useGame((s) => s.locale);
	if (!puzzle || !cable) return null;
	const target = socketAngle(cable.to, {
		fixtures,
		dimmerOutAngles,
		dimmerDmxAngle,
		consoleDmxAngle
	});
	const dmx = cable.kind === "dmx";
	const aligned = cable.toPlugAngle === target;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-bg/80 px-4",
		role: "dialog",
		"aria-modal": true,
		"aria-labelledby": "puzzle-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-xl border border-border bg-surface p-5 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-[0.18em] text-muted",
							children: "ALIGN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "puzzle-title",
							className: "font-display text-2xl tracking-tight text-fg",
							children: t(locale, dmx ? "ui.puzzleDmx" : "ui.puzzlePower")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: t(locale, "ui.puzzleHint")
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: cancelPuzzle,
						"aria-label": t(locale, "ui.cancel"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid size-52 place-items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute size-44 rounded-full border-2 border-border bg-bg",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute size-40 rounded-full border border-dashed border-muted/50",
							style: { transform: `rotate(${target}deg)` },
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-0 h-4 w-2.5 -translate-x-1/2 rounded-b-sm bg-accent" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: rotatePlug,
							className: "relative z-10 size-28 rounded-full border-2 border-accent/40 bg-surface-2 shadow-lg",
							style: { transform: `rotate(${cable.toPlugAngle}deg)` },
							"aria-label": t(locale, "ui.rotatePlug"),
							children: dmx ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-[18%] size-2.5 -translate-x-1/2 rounded-full bg-fg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-[22%] left-[28%] size-2.5 rounded-full bg-fg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-[22%] right-[28%] size-2.5 rounded-full bg-fg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-0 h-3 w-1.5 -translate-x-1/2 bg-live" })
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-[16%] h-3 w-2.5 -translate-x-1/2 rounded-sm bg-fg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-[22%] left-[26%] h-3.5 w-2 rounded-sm bg-fg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-[22%] right-[26%] h-3.5 w-2 rounded-sm bg-fg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-0 h-3 w-1.5 -translate-x-1/2 bg-live" })
							] })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-center font-mono text-xs tabular-nums text-muted",
					children: [
						t(locale, "ui.plug"),
						" ",
						cable.toPlugAngle,
						"° · ",
						t(locale, "ui.socket"),
						" ",
						target,
						"°",
						aligned ? ` · ${t(locale, "ui.aligned")}` : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-4 w-full",
					onClick: rotatePlug,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-4" }), t(locale, "ui.rotate90")]
				})
			]
		})
	});
}
function GameApp() {
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
	const [pointer, setPointer] = (0, import_react.useState)(null);
	const [hoverSlot, setHoverSlot] = (0, import_react.useState)(null);
	const [toast, setToast] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		useGame.getState().hydratePrefs();
	}, []);
	(0, import_react.useEffect)(() => {
		const onMove = (e) => setPointer({
			x: e.clientX,
			y: e.clientY
		});
		const onToast = (e) => {
			const key = e.detail;
			setToast(key);
			window.setTimeout(() => setToast(null), 2800);
		};
		const onKey = (e) => {
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
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = locale === "zh" ? "zh-HK" : "en";
	}, [locale]);
	(0, import_react.useEffect)(() => {
		markCompleteIfReady();
	}, [
		fixtures,
		cables,
		faders,
		grandMaster,
		markCompleteIfReady
	]);
	if (phase === "title") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleScreen, {});
	const mission = missionById(missionId);
	const next = missionId === "cue1" ? "cue2" : missionId === "cue2" ? "cue3" : missionId === "cue3" ? "sandbox" : null;
	const ghost = holding?.kind === "fixture" ? fixtures.find((f) => f.id === holding.fixtureId) : null;
	const gel = holding?.kind === "gel" ? gelById(holding.gelId) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-bg text-fg",
		onPointerDown: (e) => {
			unlockAudio();
			setPointer({
				x: e.clientX,
				y: e.clientY
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rack, {
					onPickFixture: (id) => {
						unlockAudio();
						setHolding({
							kind: "fixture",
							fixtureId: id
						});
					},
					onPickGel: (gelId) => {
						unlockAudio();
						if (selected) applyGel(selected, gelId);
						else setHolding({
							kind: "gel",
							gelId
						});
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageView, {
					hoverSlot,
					setHoverSlot,
					holding: holding?.kind === "fixture" || holding?.kind === "gel" ? holding : null
				})]
			}),
			holding || pendingFrom ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border bg-surface-2 px-3 py-1.5 text-center text-xs text-fg",
				children: holding?.kind === "cable" && !pendingFrom ? t(locale, holding.cable === "dmx" ? "hold.dmx" : "hold.power") : pendingFrom ? t(locale, "hold.pending") : holding?.kind === "fixture" ? t(locale, "hold.fixture") : holding?.kind === "gel" ? t(locale, "hold.gel") : null
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Console, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CablesOverlay, { pointer }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorPuzzle, {}),
			holding && pointer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2",
				style: {
					left: pointer.x,
					top: pointer.y
				},
				children: ghost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: FIXTURES[ghost.kind].sprite,
					alt: "",
					className: "h-16 w-16 object-contain opacity-90",
					crossOrigin: "anonymous"
				}) : gel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block size-8 rounded-sm ring-1 ring-border",
					style: { background: `rgb(${gel.rgb.join(",")})` }
				}) : holding.kind === "cable" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-sm bg-surface px-2 py-1 font-mono text-[10px] text-fg ring-1 ring-border",
					children: holding.cable === "dmx" ? "DMX" : "PWR"
				}) : null
			}) : null,
			toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg shadow-lg",
				children: t(locale, toast)
			}) : null,
			phase === "complete" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 grid place-items-center bg-bg/80 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-xl border border-border bg-surface p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-[0.2em] text-muted",
							children: t(locale, "ui.completeKicker")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl text-fg",
							children: missionTitle(locale, mission.id)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: t(locale, "ui.completeBody")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								className: "flex-1",
								onClick: backToTitle,
								children: t(locale, "ui.back")
							}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								onClick: () => startMission(next),
								children: t(locale, "ui.nextCue")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								onClick: () => startMission("sandbox"),
								children: t(locale, "ui.sandbox")
							})]
						})
					]
				})
			}) : null
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { Home as component };
