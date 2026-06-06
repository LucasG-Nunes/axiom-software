'use client';

import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Aqui entrará a lógica nativa de avanço de frames do vídeo 
    // baseada no 'window.scrollY'.
    const handleScroll = () => {
      // const scrollY = window.scrollY;
      // Lógica de atualização do frame do vídeo será adicionada aqui.
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-brand-bg">
      {/* 1. Seção Hero (Engenharia & Autoridade) */}
      <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
        {/* Vídeo Placeholder */}
        <div className="absolute inset-0 bg-cyan-900/20 border-b border-cyan-500/50 flex items-center justify-center">
          <span className="text-cyan-500 font-mono text-sm tracking-widest opacity-70">
            [PLACEHOLDER VÍDEO 1 - ANIMAÇÃO WIREFRAME 3D]
          </span>
        </div>

        {/* Conteúdo sobreposto */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mt-12">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-brand-border bg-brand-surface/50 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
              Por Gabriel Nunes
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Construindo o futuro digital com <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-500">engenharia obsessiva.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl">
            Software House especializada em alta performance e arquiteturas escaláveis. Do conceito ao código, sem atalhos.
          </p>
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
            Conhecer BarberStack
          </button>
        </div>
      </section>

      {/* 2. Seção Case de Sucesso (O Lançamento) */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            BarberStack: O SaaS que blinda o faturamento de barbearias de alto padrão.
          </h2>
          <p className="text-zinc-400 text-lg">Nosso primeiro produto interno. Desenvolvido com os mais altos padrões de software.</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
          {/* Card 1 */}
          <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 flex flex-col justify-end min-h-[300px] md:min-h-0 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-2">Gestão Inteligente</h3>
              <p className="text-zinc-400">Controle total sobre a agenda e os profissionais.</p>
            </div>
            {/* Mockup Placeholder */}
            <div className="absolute top-8 right-8 w-2/3 h-full bg-zinc-800/50 border border-zinc-700 rounded-t-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 transition-transform duration-500 flex items-center justify-center">
               <span className="text-zinc-600 font-mono text-xs">[MOCKUP MOBILE]</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 flex flex-col justify-end min-h-[300px] md:min-h-0 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-2">Previsibilidade</h3>
              <p className="text-zinc-400">Métricas financeiras em tempo real.</p>
            </div>
            {/* Mockup Placeholder */}
            <div className="absolute top-8 right-8 w-2/3 h-full bg-zinc-800/50 border border-zinc-700 rounded-t-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 transition-transform duration-500 flex items-center justify-center">
               <span className="text-zinc-600 font-mono text-xs">[MOCKUP DASHBOARD]</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Seção Transformação (O Efeito Apple Scroll) */}
      {/* Container de 150vh para forçar o scroll, enquanto o conteúdo fica sticky */}
      <section className="h-[150vh] relative">
        <div className="w-full h-screen sticky top-0 bg-emerald-900/20 border-y border-emerald-500/50 flex items-center justify-center overflow-hidden">
          {/* Placeholder Vídeo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-brand-green font-mono text-sm tracking-widest opacity-70">
              [PLACEHOLDER VÍDEO 2 - TRANSIÇÃO PAPEL PARA APP]
            </span>
          </div>

          {/* Copy flutuante com glassmorphism */}
          <div className="relative z-10 px-8 py-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center">
              Do caos do papel à <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-400">previsibilidade do código.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* 4. Seção Footer & CTA Duplo */}
      <footer className="w-full border-t border-brand-border bg-brand-surface mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-border">
          {/* Bloco 1: BarberStack */}
          <div className="p-16 md:p-24 flex flex-col items-center text-center hover:bg-white/[0.02] transition-colors">
            <h3 className="text-3xl font-bold text-white mb-4">BarberStack</h3>
            <p className="text-zinc-400 mb-8 max-w-sm">Junte-se à lista de espera e seja um dos primeiros a transformar sua barbearia.</p>
            <button className="px-8 py-4 bg-brand-cyan text-black font-semibold rounded-full hover:bg-cyan-400 transition-colors w-full sm:w-auto">
              Entrar na Lista de Espera
            </button>
          </div>

          {/* Bloco 2: Software House */}
          <div className="p-16 md:p-24 flex flex-col items-center text-center hover:bg-white/[0.02] transition-colors">
            <h3 className="text-3xl font-bold text-white mb-4">Projetos Empresariais</h3>
            <p className="text-zinc-400 mb-8 max-w-sm">Precisa de engenharia de alta performance para o seu próximo grande projeto?</p>
            <button className="px-8 py-4 bg-transparent border border-brand-border text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors w-full sm:w-auto">
              Iniciar Projeto
            </button>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="border-t border-brand-border p-8 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Software House. Todos os direitos reservados.</p>
          <p className="mt-4 md:mt-0">Construído com obsessão pela comunidade base.</p>
        </div>
      </footer>
    </main>
  );
}
