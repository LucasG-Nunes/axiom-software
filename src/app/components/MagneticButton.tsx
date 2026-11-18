"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({
  href,
  children,
  strength = 0.35,
}: {
  href: string;
  children: React.ReactNode;
  strength?: number;
}) {
  const area = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    const r = area.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    // Área invisível maior que o botão: a atração começa antes do cursor chegar nele
    <div
      ref={area}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block p-[50px] -m-[50px]"
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x: sx, y: sy }}
        className="group relative inline-flex items-center gap-3 rounded-full border border-brand-cyan/60 bg-brand-cyan/10 px-8 py-4 font-display text-sm font-medium uppercase tracking-widest text-white shadow-[0_0_40px_-8px_rgba(0,210,255,0.6)] backdrop-blur transition-colors hover:bg-brand-cyan hover:text-black"
      >
        {children}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </motion.a>
    </div>
  );
}
