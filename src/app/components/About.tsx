"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import BgVideo from "./BgVideo";
import GlassCard from "./GlassCard";
import ScrambleText from "./ScrambleText";

// Entrada única; opacity e clip-path rodam via WAAPI (compositor), x via transform.
const maskIn = {
  hidden: { x: -90, clipPath: "inset(0 100% 0 0)", opacity: 0 },
  show: {
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const FACTS = [
  { big: "6 anos", text: "entregando software em produção, de sistemas governamentais a financeiros." },
  { big: "Eng. de Software", text: "Formação sólida para construir sistemas que não podem cair." },
  { big: "Pós em IA Generativa e LLM", text: "Agentes de IA aplicados a processos reais da sua empresa, não a demonstrações." },
  { big: "Sem intermediários", text: "Você conversa direto com quem desenha a solução e escreve o código." },
];

/** Centro da lanterna fora da tela (furo invisível, tudo escuro). */
const TORCH_OFF = "translate3d(-400px, -400px, 0) translate(-50%, -50%)";

export default function About() {
  const section = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const torch = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const torchPos = useRef<{ x: number; y: number } | null>(null);

  // Blur-to-Clear: zoom 1.1 + blur pesado → nítido conforme o scroll avança.
  // Ao terminar, o filtro vira "none" (blur(0px) ainda manteria o passe de filtro ativo).
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "start 35%"] });
  const blur = useTransform(scrollYProgress, (p) => (p >= 1 ? "none" : `blur(${(1 - p) * 18}px)`));
  const zoom = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  // Tilt 3D do painel holográfico
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const paintTorch = () => {
    frame.current = 0;
    const p = torchPos.current;
    if (torch.current) {
      torch.current.style.transform = p ? `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)` : TORCH_OFF;
    }
  };

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    // Leituras primeiro (layout está limpo no evento); escritas ficam para o rAF.
    const sr = stage.current!.getBoundingClientRect();
    torchPos.current = { x: e.clientX - sr.left, y: e.clientY - sr.top };
    if (!frame.current) frame.current = requestAnimationFrame(paintTorch);

    const c = card.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(Math.max(-0.5, Math.min(0.5, px)) * 10);
    rx.set(-Math.max(-0.5, Math.min(0.5, py)) * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    torchPos.current = null;
    if (!frame.current) frame.current = requestAnimationFrame(paintTorch);
  };

  return (
    <section
      ref={section}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label="Quem somos"
      className="relative overflow-clip bg-[#050505]"
    >
      {/* O vídeo fica "colado" (sticky) na altura da tela: encaixa em celulares mesmo com a seção alta */}
      <div className="absolute inset-0">
        <motion.div
          style={{ filter: blur, scale: zoom }}
          className="sticky top-0 h-svh will-change-[transform,filter]"
        >
          <BgVideo src="/assets/videos/quem_somos_animation.mp4" className="h-full w-full object-cover" />
        </motion.div>
      </div>
      {/*
        Camada escura com furo de lanterna. Antes: mask-image com var(--mx) na <section>
        → recalc de estilo da seção inteira + repaint da máscara a cada movimento.
        Agora: placa do tamanho de 2 telas (+ folga), presa à viewport (sticky), pintada uma vez
        com um radial-gradient (.torch) cuja cor final cobre o resto — sem máscara, sem render
        pass extra. Só o transform muda.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div ref={stage} className="sticky top-0 h-svh overflow-hidden">
          <div
            ref={torch}
            className="torch absolute left-0 top-0 h-[calc(200%+800px)] w-[calc(200%+800px)] will-change-transform"
            style={{ transform: TORCH_OFF }}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/30 to-transparent" />
      {/* transições suaves com as seções vizinhas */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050505] to-transparent md:h-72" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent md:h-72" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-32 md:px-6 md:py-48">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
          className="lg:w-3/5"
        >
          {/* sem preserve-3d: nenhum filho usa translateZ, e preserve-3d + backdrop-filter é caro */}
          <GlassCard
            ref={card}
            blur
            innerGlow={false}
            style={{ rotateX: rx, rotateY: ry }}
            innerClassName="p-6 md:p-12"
          >
            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.18 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-15%" }}
            >
              <motion.p variants={maskIn} className="mb-6 font-display text-xs uppercase tracking-[0.4em] text-brand-cyan">
                Quem Somos
              </motion.p>
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
                <ScrambleText text="A Tropa de Elite da Engenharia." whenInView duration={1600} delay={150} />
              </h2>
              <motion.p variants={maskIn} className="mt-8 text-base leading-relaxed text-zinc-300 md:text-lg">
                Não somos uma agência tradicional de desenvolvimento. Somos engenheiros forjados na
                trincheira de sistemas críticos, agora armados com Agentes de Inteligência Artificial
                para multiplicar velocidade sem sacrificar segurança — e transformar tecnologia em
                resultado no seu caixa.
              </motion.p>
              <motion.div variants={maskIn} className="mt-8 border-t border-white/10 pt-6">
                <p className="font-display text-sm uppercase tracking-widest text-brand-cyan">
                  Você fala direto com o CTO
                </p>
                <p className="mt-3 text-base leading-relaxed text-zinc-300 md:text-lg">
                  Engenheiro de Software com pós-graduação em IA Generativa e LLMs e 6 anos entregando
                  soluções reais em produção. Quem desenha a solução é quem atende a sua ligação.
                </p>
              </motion.div>
            </motion.div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FACTS.map((f) => (
            <GlassCard
              key={f.big}
              blur
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
              innerClassName="p-6"
            >
              <p className="font-display text-xl font-medium leading-tight text-white">{f.big}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.text}</p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
