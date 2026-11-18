'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const videoOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.5]);

  const titleY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);

  const card1Opacity = useTransform(scrollYProgress, [0.20, 0.35, 0.50], [0, 1, 0.3]);
  const card1Y = useTransform(scrollYProgress, [0.20, 0.35], [100, 20]);

  const card2Opacity = useTransform(scrollYProgress, [0.45, 0.60, 0.75], [0, 1, 0.3]);
  const card2Y = useTransform(scrollYProgress, [0.45, 0.60], [100, 80]);

  const card3Opacity = useTransform(scrollYProgress, [0.70, 0.85, 1], [0, 1, 1]);
  const card3Y = useTransform(scrollYProgress, [0.70, 0.85], [100, 140]);

  const marqueeImages = [
    '/assets/rather_labs_web3_usa.jpeg',
    '/assets/react_node_fullstack_AI_usa.jpeg',
    '/assets/react_node_fullstack_aws_usa.jpeg',
    '/assets/angular_engineer_blockchain_usa.jpeg',
    '/assets/fullstack_react_native_web3_usa.jpeg',
    '/assets/frontend_engineer_web3_usa.jpeg',
    '/assets/integration_architect_usa.jpeg',
    '/assets/fullstack_engineer_usa.jpeg',
    '/assets/expert_engineer_usa.jpeg'
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A0A]">
      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden bg-black"
        aria-label="Seção principal de introdução da Axiom"
      >
        {/* Vídeo Background */}
        <video
          src="/assets/videos/video_axiom_english.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-50"
        />

        {/* Overlay para escurecer caso necessário */}
        <div className="absolute inset-0 bg-black/30" aria-hidden="true"></div>

        {/* Conteúdo sobreposto */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 mt-12 w-full">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
            className="text-[6rem] sm:text-[8rem] lg:text-[12rem] font-black leading-none tracking-tighter text-white mb-6 drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]"
          >
            AXIOM
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-zinc-300 mb-10 max-w-3xl font-light"
          >
            Engenharia de alta performance para produtos digitais. Do conceito ao código, sem atalhos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
            aria-label="Ações principais de navegação"
          >
            <Link
              href="/contact"
              aria-label="Iniciar projeto empresarial com a Axiom"
              className="px-10 py-4 bg-brand-cyan text-black font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.6)] text-lg"
            >
              Iniciar Projeto
            </Link>
            <Link
              href="/barberstack"
              aria-label="Conheça o BarberStack, nosso SaaS de gestão premium"
              className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4 text-sm"
            >
              Conheça o BarberStack: Nosso SaaS de gestão premium
            </Link>
            <a
              href="https://engineeringlab.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visite a nossa comunidade de engenharia Engineering Lab"
              className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4 text-sm mt-[-8px]"
            >
              Conheça a nossa comunidade de engenharia
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. A COMUNIDADE E OS BASTIDORES DE ELITE
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 w-full bg-[#0A0A0A]" aria-label="Ecossistema de engenharia e cases de impacto">
        <div className="max-w-7xl mx-auto">
          {/* Headline Block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-20"
          >
            <p className="text-brand-cyan text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              engineeringlab.dev · Track Record
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-[1.1]">
              Do ecossistema de engenharia direto para a produção.
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-3xl leading-relaxed">
              Como Founder da comunidade{' '}
              <span className="text-white font-medium">engineeringlab.dev</span>,
              compartilhamos experiências práticas na construção de produtos reais
              que moldam a infraestrutura tecnológica do país.
            </p>
          </motion.div>

          {/* Grid de Métricas Refatorado para 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 — O Peso do Judiciário */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              tabIndex={0}
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl p-10 relative overflow-hidden group hover:border-brand-cyan/20 transition-all duration-500"
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-cyan/5 rounded-full blur-3xl group-hover:bg-brand-cyan/10 transition-all duration-700" aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" aria-hidden="true" />
                  <span className="text-zinc-500 text-xs font-medium tracking-widest uppercase">
                    Judiciário Nacional
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  +460k linhas de código.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-500">
                    5k Merge Requests.
                  </span>
                </h3>
                <p className="text-zinc-400 leading-relaxed text-base md:text-lg">
                  Atuação direta na modernização de busca processual do PJe e na
                  arquitetura nacional do SISPREQ para o Conselho Nacional de
                  Justiça (CNJ), unificando fluxos financeiros com Angular 17+,
                  Signals e Java.
                </p>
              </div>
            </motion.div>

            {/* Card 2 — O Calibre Financeiro */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              tabIndex={0}
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl p-10 relative overflow-hidden group hover:border-brand-cyan/20 transition-all duration-500"
            >
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-700" aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
                  <span className="text-zinc-500 text-xs font-medium tracking-widest uppercase">
                    Infraestrutura Financeira
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  Bilhões em crédito.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    Zero margem para erro.
                  </span>
                </h3>
                <p className="text-zinc-400 leading-relaxed text-base md:text-lg">
                  Orquestração de sistemas de alta demanda para o Sicredi,
                  lidando com segurança robusta e microsserviços escaláveis onde
                  trafegam bilhões em crédito.
                </p>
              </div>
            </motion.div>

            {/* Card 3 — Reconhecimento de Mercado */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              tabIndex={0}
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl p-10 relative overflow-hidden group hover:border-brand-cyan/20 transition-all duration-500"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-r from-brand-cyan/5 via-blue-500/5 to-indigo-500/5 rounded-full blur-3xl group-hover:opacity-150 transition-all duration-700" aria-hidden="true" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" aria-hidden="true" />
                    <span className="text-zinc-500 text-xs font-medium tracking-widest uppercase">
                      Reconhecimento de Mercado
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    Selecionado pela Accenture.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                      Ecossistema Banco do Brasil.
                    </span>
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-base md:text-lg max-w-3xl">
                    Convocado e selecionado pela Accenture para compor frentes
                    estratégicas de engenharia voltadas ao ecossistema do Banco
                    do Brasil.
                  </p>
                </div>
                <div className="flex-shrink-0 hidden md:flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl border border-[#1A1A1A] bg-[#111] flex items-center justify-center group-hover:border-indigo-500/30 transition-colors">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500" aria-hidden="true">
                      ✓
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4 — Palco Internacional & Startups EUA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              tabIndex={0}
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl p-10 relative overflow-hidden group hover:border-brand-cyan/20 transition-all duration-500"
            >
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-700" aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <span className="text-zinc-500 text-xs font-medium tracking-widest uppercase">
                    Palco Internacional & Startups EUA
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  Engenharia validada em{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                    escala global.
                  </span>
                </h3>
                <p className="text-zinc-400 leading-relaxed text-base md:text-lg">
                  Arquitetura e desenvolvimento de soluções Fullstack, Web3 e IA para startups e empresas do mercado norte-americano.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Carrossel Infinito (Infinite Marquee) das Provas Sociais EUA */}
          <div className="mt-20 w-full overflow-hidden relative" aria-label="Provas sociais de parceiros internacionais">
            <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" aria-hidden="true"></div>

            <motion.div
              className="flex flex-nowrap w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
              {/* Primeiro bloco do array */}
              <div className="flex items-center gap-12 pr-12">
                {marqueeImages.map((src, index) => (
                  <img
                    key={`marquee1-${index}`}
                    src={src}
                    alt={`Parceiro Internacional ${index + 1}`}
                    onClick={() => setSelectedImage(src)}
                    className="h-24 md:h-32 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105"
                  />
                ))}
              </div>
              {/* Segundo bloco do array para loop ininterrupto */}
              <div className="flex items-center gap-12 pr-12">
                {marqueeImages.map((src, index) => (
                  <img
                    key={`marquee2-${index}`}
                    src={src}
                    alt={`Parceiro Internacional ${index + 1} cópia para transição`}
                    onClick={() => setSelectedImage(src)}
                    className="h-40 md:h-56 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          3. SEÇÃO INTERATIVA (Scrollytelling Vertical)
          ═══════════════════════════════════════════════════════════════════ */}
      <section ref={containerRef} className="h-[400vh] relative bg-[#0A0A0A]" aria-label="Vantagens técnicas interativas">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 text-center">

          {/* Background Vídeo */}
          <motion.video
            style={{ opacity: videoOpacity }}
            src="/assets/videos/video_axiom_english.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
          />

          <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>

          {/* Container Vertical Stack */}
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center">

            {/* Título Principal */}
            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute">
              <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">
                Do caos do papel à <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-500">previsibilidade do código.</span>
              </h2>
            </motion.div>

            {/* Cards Verticais Flutuantes */}
            <motion.div style={{ opacity: card1Opacity, y: card1Y }} className="absolute w-full px-4">
              <div tabIndex={0} className="w-full bg-[#111]/80 backdrop-blur-md border border-[#222] rounded-3xl p-8 hover:border-brand-cyan/30 transition-colors mx-auto">
                <p className="text-2xl md:text-4xl font-semibold text-white">
                  Acompanhe o lançamento do nosso aplicativo.
                </p>
              </div>
            </motion.div>

            <motion.div style={{ opacity: card2Opacity, y: card2Y }} className="absolute w-full px-4">
              <div tabIndex={0} className="w-full bg-[#111]/80 backdrop-blur-md border border-[#222] rounded-3xl p-8 hover:border-brand-cyan/30 transition-colors mx-auto">
                <p className="text-2xl md:text-4xl font-semibold text-white">
                  Arquiteturas robustas projetadas para escala global.
                </p>
              </div>
            </motion.div>

            <motion.div style={{ opacity: card3Opacity, y: card3Y }} className="absolute w-full px-4">
              <div tabIndex={0} className="w-full bg-[#111]/80 backdrop-blur-md border border-[#222] rounded-3xl p-8 hover:border-brand-cyan/30 transition-colors mx-auto">
                <p className="text-2xl md:text-4xl font-semibold text-white drop-shadow-[0_0_10px_rgba(0,210,255,0.3)]">
                  Segurança de dados e transações em nível bancário.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          4. SEÇÃO CASE DE SUCESSO (BarberStack Showcase)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full" aria-label="Case de sucesso BarberStack">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            BarberStack: O SaaS que blinda o faturamento de barbearias de alto padrão.
          </h2>
          <p className="text-zinc-400 text-lg">Nosso primeiro produto interno. Desenvolvido com os mais altos padrões de software.</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
          {/* Card 1 - Wrapper Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="group h-full"
          >
            <Link
              href="#barber_stack_landing"
              aria-label="Ver mais sobre a Gestão Inteligente do BarberStack"
              className="block h-full cursor-pointer bg-[#111] border border-[#222] rounded-3xl p-8 flex flex-col justify-end min-h-[300px] md:min-h-0 relative overflow-hidden hover:scale-[1.02] hover:border-brand-cyan/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]/90 z-10 pointer-events-none" aria-hidden="true"></div>
              <div className="relative z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Gestão Inteligente</h3>
                <p className="text-zinc-400">Controle total sobre a agenda e os profissionais.</p>
              </div>
              {/* Mockup Image */}
              <div className="absolute top-8 right-8 w-2/3 h-full rounded-t-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 transition-transform duration-500 flex items-start overflow-hidden border border-[#333] shadow-2xl pointer-events-none">
                <img src="/assets/frame_barberstack_0.png" alt="Mockup do aplicativo móvel BarberStack com tela de gestão de agendamentos" className="w-full object-cover" />
              </div>
            </Link>
          </motion.div>

          {/* Card 2 - Wrapper Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="group h-full"
          >
            <Link
              href="#barber_stack_landing"
              aria-label="Ver mais sobre o Dashboard Financeiro do BarberStack"
              className="block h-full cursor-pointer bg-[#111] border border-[#222] rounded-3xl p-8 flex flex-col justify-end min-h-[300px] md:min-h-0 relative overflow-hidden hover:scale-[1.02] hover:border-brand-cyan/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]/90 z-10 pointer-events-none" aria-hidden="true"></div>
              <div className="relative z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Previsibilidade</h3>
                <p className="text-zinc-400">Métricas financeiras em tempo real.</p>
              </div>
              {/* Mockup Image */}
              <div className="absolute top-8 right-8 w-2/3 h-full rounded-t-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 transition-transform duration-500 flex items-start overflow-hidden border border-[#333] shadow-2xl pointer-events-none">
                <img src="/assets/frame_barberstack_1.png" alt="Dashboard analítico do BarberStack mostrando faturamento e métricas" className="w-full object-cover" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          5. FOOTER DUPLO
          ═══════════════════════════════════════════════════════════════════ */}
      <footer className="w-full border-t border-[#222] bg-[#0A0A0A] relative z-30" aria-label="Rodapé do site com links de ação">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#222]">
          <div className="p-16 md:p-24 flex flex-col items-center text-center hover:bg-white/[0.02] transition-colors">
            <h3 className="text-3xl font-bold text-white mb-4">BarberStack</h3>
            <p className="text-zinc-400 mb-8 max-w-sm">Junte-se à lista de espera e seja um dos primeiros a transformar sua barbearia.</p>
            <Link
              href="http://localhost:3001"
              aria-label="Acessar a página para entrar na lista de espera do BarberStack"
              className="px-8 py-4 bg-brand-cyan text-black font-semibold rounded-full hover:bg-cyan-400 transition-colors w-full sm:w-auto"
            >
              Entrar na Lista de Espera
            </Link>
          </div>
          <div className="p-16 md:p-24 flex flex-col items-center text-center hover:bg-white/[0.02] transition-colors">
            <h3 className="text-3xl font-bold text-white mb-4">Projetos Empresariais</h3>
            <p className="text-zinc-400 mb-8 max-w-sm">Precisa de engenharia de alta performance para o seu próximo grande projeto?</p>
            <Link
              href="/contact"
              aria-label="Ir para a página de contato e iniciar um novo projeto empresarial"
              className="px-8 py-4 bg-transparent border border-[#333] text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
            >
              Iniciar Projeto
            </Link>
          </div>
        </div>
        <div className="border-t border-[#222] p-8 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Axiom Software. Todos os direitos reservados.</p>
          <p className="mt-4 md:mt-0">Construído com obsessão pela comunidade base.</p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
          6. MODAL DE IMAGEM
          ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer backdrop-blur-sm"
            aria-label="Modal de visualização de imagem"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Imagem Expandida"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white bg-black/50 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-colors"
              aria-label="Fechar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
