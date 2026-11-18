"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "0x8A!#%>01{}[]/=+*^?";

/** Decodifica o texto da esquerda para a direita. Com `whenInView`, só começa ao entrar na tela. */
export default function ScrambleText({
  text,
  duration = 1400,
  delay = 200,
  whenInView = false,
}: {
  text: string;
  duration?: number;
  delay?: number;
  whenInView?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [out, setOut] = useState(text);
  const go = whenInView ? inView : true;

  useEffect(() => {
    if (!go) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const p = Math.min((now - start) / duration, 1);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          if (c === " " || c === ".") {
            s += c;
            continue;
          }
          s += p >= (i + 1) / text.length ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(p >= 1 ? text : s);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [go, text, duration, delay]);

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
