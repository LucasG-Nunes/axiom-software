"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Props = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: React.ReactNode;
  /** cor (hex de 6 dígitos) da luz que persegue o cursor */
  glow?: string;
  innerClassName?: string;
};

/** Painel de vidro escuro com borda e luz interna que seguem o mouse (hover de lanterna). */
export default function GlassCard({
  children,
  glow = "#00d2ff",
  className = "",
  innerClassName = "p-8",
  onPointerMove,
  ...rest
}: Props) {
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
    onPointerMove?.(e);
  };

  return (
    <motion.div
      {...rest}
      onPointerMove={move}
      className={`group relative rounded-3xl bg-white/10 p-px ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(320px circle at var(--x,50%) var(--y,50%), ${glow}, transparent 70%)` }}
      />
      <div className={`relative h-full rounded-[23px] bg-[#0a0a0a]/60 backdrop-blur-xl ${innerClassName}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[23px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(360px circle at var(--x,50%) var(--y,50%), ${glow}22, transparent 70%)` }}
        />
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  );
}
