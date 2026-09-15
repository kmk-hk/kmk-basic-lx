import { useEffect, useRef } from "react";
import { PIPE_Y, SLOT_XS } from "@/lib/game/catalog";
import { beamRgb, fixtureLevel, poolFor } from "@/lib/game/lighting";
import { useGame } from "@/lib/game/store";

export function BeamsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fixtures = useGame((s) => s.fixtures);
  const cables = useGame((s) => s.cables);
  const faders = useGame((s) => s.faders);
  const grandMaster = useGame((s) => s.grandMaster);
  const blackout = useGame((s) => s.blackout);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let last = performance.now();
    const parent = canvas.parentElement;

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      void dt;
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
        if (level < 0.01) continue;
        const flicker = 1 + Math.sin(now * 0.055 + fixture.hangSlot * 1.7) * 0.018;
        const [r, g, b] = beamRgb(fixture, level * flicker);
        const pool = poolFor(fixture);
        const ox = SLOT_XS[fixture.hangSlot]! * w;
        const oy = (PIPE_Y + 0.07) * h;
        const px = pool.x * w;
        const py = pool.y * h;
        const rad = pool.r * w;

        const half = rad * 0.85;
        const left = px - half;
        const right = px + half;

        const cone = ctx.createLinearGradient(ox, oy, px, py);
        cone.addColorStop(0, `rgba(${r},${g},${b},${0.22 + level * 0.28})`);
        cone.addColorStop(0.55, `rgba(${r},${g},${b},${0.1 + level * 0.12})`);
        cone.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = cone;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(left, py);
        ctx.quadraticCurveTo(px, py + rad * 0.35, right, py);
        ctx.closePath();
        ctx.fill();

        const glow = ctx.createRadialGradient(px, py, 0, px, py, rad);
        glow.addColorStop(0, `rgba(${r},${g},${b},${0.35 + level * 0.4})`);
        glow.addColorStop(0.45, `rgba(${r},${g},${b},${0.12 * level})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.ellipse(px, py, rad, rad * 0.38, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${r},${g},${b},${0.45 + level * 0.4})`;
        ctx.beginPath();
        ctx.arc(ox, oy, 5 + level * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fixtures, cables, faders, grandMaster, blackout]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      aria-hidden
    />
  );
}
