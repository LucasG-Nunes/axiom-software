"use client";

import { useEffect, useRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  /** cor (hex de 6 dígitos) da luz que persegue o cursor */
  glow?: string;
  /** box-shadow exibido no hover (ex.: halo colorido); entra por opacidade, sem repintar */
  halo?: string;
  /**
   * Desfoca o que está atrás (backdrop-filter). Só vale a pena sobre vídeo/imagem:
   * sobre fundo liso o resultado é idêntico e o custo de GPU é desperdiçado.
   */
  blur?: boolean;
  /** luz interna difusa que segue o cursor */
  innerGlow?: boolean;
  innerClassName?: string;
};

/**
 * Painel de vidro escuro com borda e luz interna que seguem o mouse.
 *
 * Performance (medido na GPU integrada):
 * - A luz é um radial-gradient pintado como `background` de uma camada FOLHA (sem filhos).
 *   As variáveis --x/--y ficam nela mesma → o recálculo de estilo atinge 1 elemento e o
 *   repaint é só um gradiente, numa camada própria durante o hover.
 * - NÃO usar "blob" composto dentro de wrapper `overflow-hidden` + `border-radius`: cada um vira
 *   um render pass com máscara de canto arredondado por frame (dobrava o tempo de frame).
 */
export default function GlassCard({
  children,
  glow = "#00d2ff",
  halo,
  blur = false,
  innerGlow = true,
  className = "",
  innerClassName = "p-8",
  onPointerMove,
  ...rest
}: Props) {
  const borderLight = useRef<HTMLDivElement>(null);
  const innerLight = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    // leitura no evento (layout limpo) → escrita agrupada em 1 rAF por frame
    const r = e.currentTarget.getBoundingClientRect();
    pos.current.x = e.clientX - r.left;
    pos.current.y = e.clientY - r.top;
    if (!frame.current) {
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const x = `${pos.current.x}px`;
        const y = `${pos.current.y}px`;
        for (const el of [borderLight.current, innerLight.current]) {
          if (!el) continue;
          el.style.setProperty("--x", x);
          el.style.setProperty("--y", y);
        }
      });
    }
    onPointerMove?.(e);
  };

  return (
    <motion.div
      {...rest}
      onPointerMove={move}
      className={`group relative rounded-3xl bg-white/10 p-px ${className}`}
    >
      {halo && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: halo }}
        />
      )}
      {/* borda: a luz aparece só pela fresta de 1px (p-px) entre o card e o miolo */}
      <div
        ref={borderLight}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:will-change-[opacity]"
        style={{ background: `radial-gradient(320px circle at var(--x,50%) var(--y,50%), ${glow}, transparent 70%)` }}
      />
      {/* blur 12px + fundo um pouco mais denso ≈ visual do antigo blur 24px, com ~metade do custo */}
      <div className={`relative h-full rounded-[23px] ${blur ? "bg-[#0a0a0a]/70" : "bg-[#0a0a0a]/60"} ${innerClassName}`}>
        {/* vidro isolado numa camada própria: o conteúdo/luzes mudam sem tocar no filtro */}
        {blur && (
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[23px] backdrop-blur-md" />
        )}
        {innerGlow && (
          <div
            ref={innerLight}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[23px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:will-change-[opacity]"
            style={{ background: `radial-gradient(360px circle at var(--x,50%) var(--y,50%), ${glow}22, transparent 70%)` }}
          />
        )}
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  );
}
