import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Problems from "@/app/components/Problems";
import Cases from "@/app/components/Cases";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      {/* Conteúdo: desliza sobre o footer fixo (Curtain Reveal) */}
      <main className="relative z-10 bg-[#050505] mb-[50svh] shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
        <Hero />
        <About />
        <Problems />
        <Cases />
      </main>
      <Footer />
    </>
  );
}
