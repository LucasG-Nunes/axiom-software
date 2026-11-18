"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; z: number };

/** Núcleo de rede neural 3D desenhado em Canvas (nós + sinapses), gira com o mouse. */
export default function NeuralCore({
  tilt,
}: {
  tilt: React.RefObject<{ x: number; y: number }>;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // nós distribuídos numa esfera (espiral de Fibonacci) com ruído radial
    const N = 110;
    const pts: P[] = [];
    for (let i = 0; i < N; i++) {
      const k = (i + 0.5) / N;
      const phi = Math.acos(1 - 2 * k);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 0.72 + Math.random() * 0.28;
      pts.push({
        x: Math.cos(theta) * Math.sin(phi) * r,
        y: Math.sin(theta) * Math.sin(phi) * r,
        z: Math.cos(phi) * r,
      });
    }

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);

    let rotY = 0, rotX = 0, t = 0, raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      t += 0.004;
      rotY += (t + tilt.current.y * 0.6 - rotY) * 0.06;
      rotX += (tilt.current.x * 0.5 - rotX) * 0.06;

      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.38;
      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      const cx = Math.cos(rotX), sx = Math.sin(rotX);

      const proj = pts.map((p) => {
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const s = 1 / (1.9 - z2 * 0.55);
        return { sx: w / 2 + x1 * R * s * 1.9, sy: h / 2 + y2 * R * s * 1.9, z: z2, s };
      });

      // sinapses
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z;
          const d = dx * dx + dy * dy + dz * dz;
          if (d < 0.2) {
            const depth = (proj[i].z + proj[j].z + 2) / 4;
            ctx.strokeStyle = `rgba(0,210,255,${(1 - d / 0.2) * 0.45 * (0.25 + depth)})`;
            ctx.beginPath();
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }
      // nós (glow)
      for (let i = 0; i < N; i++) {
        const p = proj[i];
        const depth = (p.z + 1) / 2;
        const pulse = 0.6 + 0.4 * Math.sin(t * 6 + i);
        const r = (1.2 + depth * 2.4) * (reduce ? 1 : pulse + 0.4);
        const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 5);
        g.addColorStop(0, `rgba(160,240,255,${0.5 + depth * 0.5})`);
        g.addColorStop(0.3, `rgba(0,210,255,${0.25 * (0.4 + depth)})`);
        g.addColorStop(1, "rgba(0,210,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [tilt]);

  return <canvas ref={canvas} className="h-full w-full" aria-hidden="true" />;
}
