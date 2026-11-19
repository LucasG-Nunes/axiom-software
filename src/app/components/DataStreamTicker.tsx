"use client";

import { useEffect, useRef } from "react";

const HEX = "0123456789ABCDEF8X#%";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&01";
const SCRAMBLABLE = /[0-9A-Za-zÀ-ÿ]/;

/**
 * Roleta criptografada: os caracteres embaralham e travam um a um (esq → dir)
 * até o valor final, ex.: +8X2k → +294k → +460k. `keep` lista caracteres fixos.
 *
 * Performance: o valor final (invisível) reserva a caixa; a roleta roda numa camada
 * absoluta por cima e escreve direto no nó de texto, sem re-render nem reflow do card.
 */
export default function DataStreamTicker({
  text,
  active,
  duration = 2200,
  keep = "",
  className,
}: {
  text: string;
  active: boolean;
  duration?: number;
  keep?: string;
  className?: string;
}) {
  const live = useRef<HTMLSpanElement>(null);
  const masked = text.replace(/./g, (c) => (SCRAMBLABLE.test(c) && !keep.includes(c) ? "0" : c));

  useEffect(() => {
    const node = live.current?.firstChild;
    if (!active || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.nodeValue = text;
      return;
    }
    const chars = [...text];
    const idxs = chars.map((c, i) => (SCRAMBLABLE.test(c) && !keep.includes(c) ? i : -1)).filter((i) => i >= 0);
    let raf = 0, start = 0, last = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      if (now - last > 45 || p >= 1) {
        last = now;
        const s = chars.map((c, i) => {
          const k = idxs.indexOf(i);
          if (k < 0) return c;
          if (p >= ((k + 1) / idxs.length) * 0.85) return c;
          const pool = /[0-9]/.test(c) ? HEX : LETTERS;
          return pool[Math.floor(Math.random() * pool.length)];
        });
        node.nodeValue = p >= 1 ? text : s.join("");
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      node.nodeValue = text;
    };
  }, [active, text, duration, keep]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true" className="relative block">
        <span className="invisible">{text}</span>
        <span ref={live} className="absolute inset-0 whitespace-nowrap">
          {masked}
        </span>
      </span>
    </span>
  );
}
