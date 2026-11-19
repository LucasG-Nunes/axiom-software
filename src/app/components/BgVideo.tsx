"use client";

import { useEffect, useRef } from "react";

/**
 * Vídeo de fundo em loop que só decodifica enquanto está de fato visível.
 *
 * - `priority`: só o vídeo da primeira dobra usa autoPlay. Os demais começam pausados
 *   (com o 1º frame já carregado) e o IntersectionObserver dá o play — antes todos
 *   tinham autoPlay e o do "Quem Somos" decodificava junto com o do Hero desde o load.
 * - Exige área visível real (ratio > 0): o IO considera "encostar na borda" como
 *   intersecção, e a seção logo abaixo do Hero ficava tocando fora da tela.
 * - `hidden`: o pai avisa que o vídeo está coberto (ex.: overlay preto do Hero); pausa
 *   mesmo estando "na tela", liberando o decodificador para o vídeo da próxima seção.
 */
export default function BgVideo({
  src,
  className,
  priority = false,
  hidden = false,
}: {
  src: string;
  className?: string;
  priority?: boolean;
  hidden?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(priority);
  const covered = useRef(hidden);

  const sync = () => {
    const v = ref.current;
    if (!v) return;
    if (visible.current && !covered.current) {
      if (v.paused) v.play().catch(() => {});
    } else if (!v.paused) v.pause();
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting && e.intersectionRatio > 0;
        sync();
      },
      { threshold: [0, 0.01] },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    covered.current = hidden;
    sync();
  }, [hidden]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay={priority}
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      className={className}
    />
  );
}
