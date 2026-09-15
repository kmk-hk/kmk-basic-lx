let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function ac() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.22;
    master.connect(ctx.destination);
  }
  return ctx;
}

export function unlockAudio() {
  const c = ac();
  if (c?.state === "suspended") void c.resume();
}

function envGain(duration: number, peak: number) {
  const c = ac();
  if (!c || !master) return null;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, c.currentTime);
  g.gain.exponentialRampToValueAtTime(peak, c.currentTime + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  g.connect(master);
  return g;
}

export function playClick() {
  const c = ac();
  const g = envGain(0.05, 0.08);
  if (!c || !g) return;
  const o = c.createOscillator();
  o.type = "square";
  o.frequency.value = 1640;
  o.connect(g);
  o.start();
  o.stop(c.currentTime + 0.05);
}

export function playSeat() {
  const c = ac();
  const g = envGain(0.12, 0.16);
  if (!c || !g) return;
  const o = c.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(220, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(90, c.currentTime + 0.1);
  o.connect(g);
  o.start();
  o.stop(c.currentTime + 0.12);
}

export function playStrike() {
  const c = ac();
  const g = envGain(0.35, 0.1);
  if (!c || !g) return;
  const o = c.createOscillator();
  o.type = "sawtooth";
  o.frequency.value = 70;
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 420;
  o.connect(f).connect(g);
  o.start();
  o.stop(c.currentTime + 0.35);
}

export function playComplete() {
  const c = ac();
  if (!c || !master) return;
  const notes = [392, 494, 587];
  notes.forEach((freq, i) => {
    const g = c.createGain();
    const t = c.currentTime + i * 0.12;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    g.connect(master!);
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.value = freq;
    o.connect(g);
    o.start(t);
    o.stop(t + 0.42);
  });
}
