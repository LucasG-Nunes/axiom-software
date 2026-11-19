import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Problems from "@/app/components/Problems";
import Cases from "@/app/components/Cases";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      {/* Conteúdo: desliza sobre o footer fixo (Curtain Reveal) */}
      <main className="relative z-10 bg-[#050505] mb-[50svh]">
        {/*
          Sombra sobre o footer. Antes: box-shadow de 120px de blur no <main> inteiro (camada
          gigante por causa do footer fixo). Agora: só um degradê de 160px na borda de baixo.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-full h-40 bg-gradient-to-b from-black/70 to-transparent"
        />
        <Hero />
        <About />
        <Problems />
        <Cases />
      </main>
      <Footer />
    </>
  );
}
