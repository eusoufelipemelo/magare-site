"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Step = { title: string; text: string; image: { src: string; alt: string } };

/**
 * Linha do tempo que se preenche conforme a rolagem: a linha verde avança e cada etapa
 * acende quando o traço chega nela. Computador: etapas alternadas dos dois lados da linha.
 * Celular: linha à esquerda.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6; // ponto da tela que "desenha" a linha
      const p = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      setProgress(p);
      const nodes = list.querySelectorAll<HTMLElement>("[data-node]");
      let last = -1;
      nodes.forEach((n, i) => {
        if (n.getBoundingClientRect().top + 12 <= anchor) last = i;
      });
      setReached(last);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={ref} className="relative mt-16 lg:mt-24">
      {/* trilho e preenchimento */}
      <span aria-hidden className="absolute bottom-0 left-[15px] top-0 w-px bg-line lg:left-1/2" />
      <span aria-hidden className="absolute left-[15px] top-0 w-px origin-top bg-brand lg:left-1/2" style={{ height: `${progress * 100}%` }} />

      {steps.map((s, i) => {
        const on = i <= reached;
        const even = i % 2 === 0;
        return (
          <li key={s.title} className="relative grid grid-cols-[32px_1fr] gap-x-6 pb-16 last:pb-0 lg:grid-cols-[1fr_64px_1fr] lg:gap-x-0 lg:pb-28">
            {/* marcador */}
            <span
              data-node
              aria-hidden
              className={`relative z-10 mt-1 grid size-[31px] place-items-center rounded-full border transition-all duration-700 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:mt-2 ${
                on ? "border-brand bg-brand text-brand-contrast" : "border-line bg-surface text-muted"
              }`}
            >
              <span className="font-display text-[0.95rem]">{i + 1}</span>
            </span>

            {/* texto */}
            <div
              className={`transition-all duration-700 lg:row-start-1 ${even ? "lg:col-start-1 lg:pr-16 lg:text-right" : "lg:col-start-3 lg:pl-16"} ${
                on ? "opacity-100" : "opacity-40"
              }`}
            >
              <h3 className="font-display text-[1.75rem] leading-tight text-ink sm:text-[2.1rem]">{s.title}</h3>
              <p className={`mt-3 max-w-md leading-relaxed text-muted ${even ? "lg:ml-auto" : ""}`}>{s.text}</p>
            </div>

            {/* foto */}
            <div className={`col-start-2 mt-6 lg:row-start-1 lg:mt-0 ${even ? "lg:col-start-3 lg:pl-16" : "lg:col-start-1 lg:pr-16"}`}>
              <div
                className={`relative aspect-[4/3] overflow-hidden bg-surface-alt transition-[clip-path,filter] duration-[1.2s] ease-[cubic-bezier(0.7,0,0.2,1)] lg:max-w-[440px] ${even ? "" : "lg:ml-auto"} ${
                  on ? "[clip-path:inset(0_0_0_0)]" : "grayscale-[0.6] [clip-path:inset(0_0_18%_0)]"
                }`}
              >
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 440px, 85vw" className="object-cover" />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
