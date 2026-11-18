export default function Footer() {
  // Fixo no fundo (z-0) e coberto pelo <main> (z-10): o main desliza e revela o footer.
  return (
    <footer className="fixed bottom-0 left-0 z-0 flex h-[50svh] w-full flex-col justify-between overflow-hidden bg-[#0a0a0a] px-[6vw] py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[120%] w-[80%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.14),transparent_65%)]"
      />
      <p className="relative font-display text-[clamp(4rem,20vw,18rem)] font-bold leading-none tracking-tighter text-white/[0.06]">
        AXIOM
      </p>
      <div className="relative flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p>AXIOM © 2026. Construído com obsessão pela engenharia base.</p>
        <a
          href="https://wa.me/5581994532077"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline w-fit text-white"
        >
          Falar com o CTO no WhatsApp →
        </a>
      </div>
    </footer>
  );
}
