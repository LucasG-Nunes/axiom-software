"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import BgVideo from "./BgVideo";
import MagneticButton from "./MagneticButton";

const IRIS = { duration: 3, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 };

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Mouse-Tracking Parallax: vídeo se move ~15px no sentido oposto ao do mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [15, -15]), { stiffness: 60, damping: 18 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 18 });
  const onMove = (e: React.PointerEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  // Deep Dive Parallax: vídeo diminui e um overlay preto chega a 100%
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const diveScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  // opacity roda numa ScrollTimeline nativa: keyframes sempre de 0 a 1, senão o navegador
  // completa a ponta com o valor base e o overlay "desmergulha" nos últimos 10%.
  const overlay = useTransform(scrollYProgress, [0, 0.9, 1], [0, 1, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);

  // Com o overlay 100% preto o vídeo é invisível: pausa e sai da composição. Libera GPU e
  // decodificador justo na entrada do "Quem Somos" (2 vídeos 1080p ao mesmo tempo pesavam
  // ~16ms/frame na GPU integrada). Só re-renderiza ao cruzar o limiar.
  const [covered, setCovered] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = p >= 0.9;
    if (next !== covered) setCovered(next);
  });

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      aria-label="Apresentação da AXIOM"
      className="relative h-svh min-h-[560px] w-full overflow-hidden bg-[#050505]"
    >
      {/*
        Slow Iris Reveal: sai do preto absoluto e a luz vem de dentro para fora.
        Antes: opacity + filter: brightness(0→1) num layer de tela cheia com vídeo (shader por frame).
        brightness(b) sobre preto ≡ opacidade b, então duas opacidades aninhadas reproduzem
        exatamente a curva (opacity × brightness) usando só o compositor.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={IRIS}
        style={{ scale: diveScale }}
        className={`absolute inset-0 bg-[#050505] will-change-transform ${covered ? "invisible" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={IRIS}
          style={{ x: px, y: py }}
          className="absolute inset-0 flex items-center justify-center bg-[#050505] will-change-transform md:-inset-8"
        >
          <BgVideo
            src="/assets/videos/hero_animation.mp4"
            priority
            hidden={covered}
            className="h-auto w-full object-contain md:h-full md:object-cover"
          />
        </motion.div>
      </motion.div>

      {/* legibilidade do texto + overlay do mergulho */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      {/* valores ligados ao scroll mudam a cada frame: will-change os mantém em camada própria */}
      <motion.div style={{ opacity: overlay }} className="pointer-events-none absolute inset-0 bg-black will-change-[opacity]" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 will-change-[transform,opacity] flex h-full flex-col items-center justify-end px-6 pb-[10svh] text-center"
      >
        {/* O vídeo já exibe a marca; o H1 fica para SEO e leitores de tela */}
        <h1 className="sr-only">AXIOM</h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="max-w-2xl text-base text-zinc-200 md:text-xl"
        >
          Soluções de IA escaláveis que automatizam sua operação, cortam custos e aumentam o seu
          lucro. Do conceito ao código em produção, sem atalhos.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-12"
        >
          <MagneticButton href="https://wa.me/5581994532077">Falar com o CTO</MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
