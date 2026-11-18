"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import BgVideo from "./BgVideo";
import MagneticButton from "./MagneticButton";

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
  const overlay = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      aria-label="Apresentação da AXIOM"
      className="relative h-svh min-h-[560px] w-full overflow-hidden bg-[#050505]"
    >
      {/* Slow Iris Reveal: sai do preto absoluto e a luz vem de dentro para fora */}
      <motion.div
        initial={{ opacity: 0, filter: "brightness(0)" }}
        animate={{ opacity: 1, filter: "brightness(1)" }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ scale: diveScale }}
        className="absolute inset-0 bg-[#050505] will-change-transform"
      >
        <motion.div
          style={{ x: px, y: py }}
          className="absolute inset-0 flex items-center justify-center bg-[#050505] md:-inset-8"
        >
          <BgVideo
            src="/assets/videos/hero_animation.mp4"
            className="h-auto w-full object-contain md:h-full md:object-cover"
          />
        </motion.div>
      </motion.div>

      {/* legibilidade do texto + overlay do mergulho */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      <motion.div style={{ opacity: overlay }} className="pointer-events-none absolute inset-0 bg-black" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-[10svh] text-center"
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
