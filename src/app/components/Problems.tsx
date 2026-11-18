"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

const items = [
  {
    title: "Equipe presa em tarefa repetitiva",
    text: "Agentes de IA assumem planilhas, cadastros e repasses. Seu time foca em vender e atender, e você cresce sem contratar na mesma proporção.",
  },
  {
    title: "Cliente esperando resposta é venda perdida",
    text: "Atendimento e qualificação de leads com IA, 24 horas por dia. Mais oportunidades respondidas na hora, mais contratos fechados.",
  },
  {
    title: "Lentidão no Go-To-Market",
    text: "Agentes de IA escrevendo infraestrutura em horas, não em semanas. Você chega ao mercado antes e começa a faturar antes.",
  },
  {
    title: "Código frágil e legado caro",
    text: "Arquiteturas resilientes testadas automaticamente desde o dia zero: menos sistema fora do ar, menos retrabalho, menos custo de manutenção.",
  },
  {
    title: "Decisões no escuro",
    text: "Relatórios e painéis automáticos com os números certos na hora certa, para cortar desperdício e investir onde dá retorno.",
  },
  {
    title: "Falta de previsibilidade",
    text: "Transparência total e pipelines de deploy 100% automatizados. Você sabe o que vai receber, quando e quanto vai custar.",
  },
];

const card = {
  hidden: { opacity: 0, y: 70 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Problems() {
  return (
    <section aria-label="Problemas que resolvemos" className="mx-auto max-w-7xl px-5 py-24 md:px-6 md:py-32">
      <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-brand-cyan">
        Problemas que resolvemos
      </p>
      <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
        Onde sua empresa está perdendo dinheiro.
      </h2>
      <p className="mt-6 max-w-2xl text-base text-zinc-400 md:text-lg">
        Aqui não falamos de tecnologia pela tecnologia. Cada solução existe para uma coisa: fazer
        você lucrar mais, automatizando o que hoje custa tempo e dinheiro.
      </p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((it, i) => (
          <GlassCard key={it.title} variants={card} innerClassName="p-7 md:p-8">
            <span className="font-display text-sm text-brand-cyan">0{i + 1}</span>
            <h3 className="mt-10 font-display text-xl font-medium leading-snug text-white md:text-2xl">{it.title}</h3>
            <p className="mt-4 leading-relaxed text-zinc-400">{it.text}</p>
          </GlassCard>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-14 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between"
      >
        <p className="font-display text-xl text-white md:text-2xl">
          Quanto da sua operação a IA poderia fazer por você?
        </p>
        <a
          href="https://wa.me/5581994532077"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-brand-cyan/60 bg-brand-cyan/10 px-7 py-3.5 font-display text-sm uppercase tracking-widest text-white transition-colors hover:bg-brand-cyan hover:text-black"
        >
          Falar com o CTO →
        </a>
      </motion.div>
    </section>
  );
}
