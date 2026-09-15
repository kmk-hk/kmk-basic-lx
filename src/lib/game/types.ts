export type FixtureKind = "fresnel" | "par" | "flood" | "profile";
export type CableKind = "power" | "dmx";
export type Angle = 0 | 90 | 180 | 270;

export type PortRef =
  | { type: "fixture-power"; fixtureId: string }
  | { type: "dimmer-out"; channel: number }
  | { type: "dimmer-dmx" }
  | { type: "console-dmx" };

export type Fixture = {
  id: string;
  kind: FixtureKind;
  hangSlot: number | null;
  tilt: number;
  pan: number;
  gelId: string | null;
  powerInAngle: Angle;
};

export type Cable = {
  id: string;
  kind: CableKind;
  from: PortRef;
  to: PortRef;
  fromPlugAngle: Angle;
  toPlugAngle: Angle;
  fromSeated: boolean;
  toSeated: boolean;
};

export type Objective = {
  id: string;
  label: string;
  hint: string;
};

export type Mission = {
  id: string;
  index: string;
  title: string;
  titleEn: string;
  blurb: string;
  sandbox?: boolean;
  fixtures: Array<{ id: string; kind: FixtureKind; powerInAngle: Angle }>;
  dimmerOutAngles: Angle[];
  dimmerDmxAngle: Angle;
  consoleDmxAngle: Angle;
  objectives: Objective[];
};

export type GamePhase = "title" | "play" | "complete";

export type Holding =
  | { kind: "cable"; cable: CableKind }
  | { kind: "gel"; gelId: string }
  | { kind: "fixture"; fixtureId: string }
  | null;

export type GameState = {
  phase: GamePhase;
  missionId: string;
  fixtures: Fixture[];
  cables: Cable[];
  dimmerOutAngles: Angle[];
  dimmerDmxAngle: Angle;
  consoleDmxAngle: Angle;
  faders: number[];
  grandMaster: number;
  blackout: boolean;
  selectedFixtureId: string | null;
  holding: Holding;
  pendingFrom: PortRef | null;
  puzzle: { cableId: string } | null;
  completedMissions: string[];
  audioOn: boolean;
  rackOpen: boolean;
  locale: "zh" | "en";
};
