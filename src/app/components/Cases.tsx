"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import BgVideo from "./BgVideo";
import DataStreamTicker from "./DataStreamTicker";
import GlassCard from "./GlassCard";
import { useMediaQuery } from "@/lib/useMediaQuery";

type CaseId = "cnj" | "sicredi";

const CASES = {
  cnj: {
    tag: "Judiciário Nacional · CNJ / SisPreq",
    value: "+460k",
    keep: "k",
    unit: "linhas de código",
    text: "O SisPreq é o Sistema Nacional de Precatórios e RPV do CNJ, do Programa Justiça 4.0, disponível aos tribunais pela PDPJ-Br. Ele reúne em um único ambiente digital todo o ciclo de pagamento de dívidas judiciais, do cadastro ao pagamento. Desenvolvimento direto na arquitetura nacional.",
    bullets: [
      "Cadastro, saldos, correção monetária e consulta no mesmo sistema",
      "Tribunais, entes devedores e credores integrados e padronizados",
      "Zero margem para erro em escala governamental",
    ],
    forYou: "Confiabilidade de governo aplicada ao seu sistema.",
    color: "#1e6bff",
    glow: "0 0 60px -10px rgba(30,107,255,0.85)",
    links: [
      { label: "Justiça 4.0", href: "https://www.cnj.jus.br/tecnologia-da-informacao-e-comunicacao/justica-4-0/" },
      { label: "Docs do SisPreq", href: "https://docs.pdpj.jus.br/servicos-negociais/sispreq/" },
    ],
  },
  sicredi: {
    tag: "Infraestrutura Financeira · Sicredi",
    value: "Bilhões",
    keep: "",
    unit: "em transações",
    text: "Crédito consignado em uma cooperativa com mais de 10 milhões de associados e presença em todas as regiões do Brasil. Orquestração de sistemas de alta demanda e integrações bancárias complexas, com parcelas descontadas direto na folha de pagamento.",
    bullets: [
      "Consignado para INSS, servidores públicos e setor privado",
      "Integrações bancárias complexas sob alta demanda",
      "Precisão em cada parcela, em cada transação",
    ],
    forYou: "Segurança de banco para o seu fluxo financeiro.",
    color: "#a855f7",
    glow: "0 0 60px -10px rgba(168,85,247,0.85)",
    links: [
      { label: "Consignado Sicredi", href: "https://www.sicredi.com.br/site/credito/para-voce/consignado/" },
      { label: "Sicredi", href: "https://www.sicredi.com.br/home/" },
    ],
  },
} as const;

function HudCard({
  id,
  pinned,
  hovered,
  setHovered,
  progress,
  range,
  floatDelay,
}: {
  id: CaseId;
  pinned: boolean;
  hovered: CaseId | null;
  setHovered: (v: CaseId | null) => void;
  progress: MotionValue<number>;
  range: [number, number];
  floatDelay: number;
}) {
  const c = CASES[id];
  const [active, setActive] = useState(false);
  // Desktop: o scroll (pin) dita quando o card surge. Mobile: surge ao entrar na tela.
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [140, 0]);
  const scale = useTransform(progress, range, [0.88, 1]);
  useMotionValueEvent(progress, "change", (p) => {
    if (pinned && p > range[1]) {
      setActive(true);
    }
  });

  const isHover = hovered === id;
  const dimmed = hovered !== null && !isHover; // Focus Shift

  const reveal = pinned
    ? { style: { opacity, y, scale } }
    : {
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.8 },
        onViewportEnter: () => setActive(true),
      };

  return (
    <motion.div {...reveal}>
      {/* levitação contínua */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      >
        <GlassCard
          glow={c.color}
          onPointerEnter={() => setHovered(id)}
          onPointerLeave={() => setHovered(null)}
          animate={{ opacity: dimmed ? 0.4 : 1, filter: dimmed ? "blur(4px)" : "blur(0px)" }}
          transition={{ duration: 0.4 }}
          style={{ boxShadow: isHover ? c.glow : "none" }}
          innerClassName="p-6 lg:p-8"
        >
          <span className="mb-5 inline-block rounded-full border border-brand-cyan/40 px-3.5 py-1 font-display text-[11px] uppercase tracking-widest text-brand-cyan">
            {c.tag}
          </span>
          <DataStreamTicker
            text={c.value}
            keep={c.keep}
            active={active}
            className="block font-display text-[clamp(3.25rem,7vw,6rem)] font-bold leading-none tracking-tighter text-white tabular-nums"
          />
          <p className="mt-1 font-display text-lg text-white lg:text-xl">{c.unit}</p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-300">{c.text}</p>
          {/* some em telas baixas para o card caber na altura do pin */}
          <ul className="mt-4 space-y-1.5 text-sm text-zinc-400 [@media(max-height:820px)]:hidden">
            {c.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-cyan" />
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-white/10 pt-4 font-display text-sm text-white">
            <span className="text-brand-cyan">Para você: </span>
            {c.forYou}
          </p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-500">
            {c.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
                {l.label} ↗
              </a>
            ))}
          </p>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

export default function Cases() {
  const ref = useRef<HTMLElement>(null);
  const pinned = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [hovered, setHovered] = useState<CaseId | null>(null);

  return (
    <section ref={ref} aria-label="Experiências e soluções" className="relative overflow-clip lg:h-[300vh]">
      {/* vídeo colado na altura da tela (sticky): encaixa certo em celulares */}
      <div className="absolute inset-0">
        <div className="sticky top-0 h-svh">
          <BgVideo src="/assets/videos/track_record_animation.mp4" className="h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 bg-[#050505]/55" />
        </div>
      </div>
      {/* transições suaves com as seções vizinhas */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050505] to-transparent md:h-72" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />

      {/* Comando Central: no desktop a seção trava (pin) e o scroll revela os cards */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-28 md:px-6 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <p className="mb-3 font-display text-xs uppercase tracking-[0.4em] text-brand-cyan">Track Record</p>
        <h2 className="mb-8 font-display text-4xl font-bold leading-none tracking-tighter text-white md:text-6xl lg:mb-6 lg:text-6xl">
          Experiências e Soluções
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <HudCard id="cnj" pinned={pinned} hovered={hovered} setHovered={setHovered} progress={scrollYProgress} range={[0.12, 0.3]} floatDelay={0} />
          <HudCard id="sicredi" pinned={pinned} hovered={hovered} setHovered={setHovered} progress={scrollYProgress} range={[0.44, 0.62]} floatDelay={1.2} />
        </div>
      </div>
    </section>
  );
}
