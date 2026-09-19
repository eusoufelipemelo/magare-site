"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { ChevronIcon, CloseIcon } from "./icons";

export type LightboxItem = { src: string; width: number; height: number; alt: string; project?: { slug: string; title: string } };

/** Visualizador de fotos em tela cheia: setas, teclado (←, →, Esc) e deslizar no celular. */
export function Lightbox({ items, index, onChange, onClose }: { items: LightboxItem[]; index: number | null; onChange: (i: number) => void; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      previous?.focus();
    };
  }, [open, go, onClose]);

  if (!item || index === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex flex-col bg-ink/96 text-surface backdrop-blur-sm"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:h-20 sm:px-8">
        <p className="text-sm tabular-nums text-surface/70">
          {index + 1} de {items.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Fechar" className="grid size-11 cursor-pointer place-items-center rounded-full text-surface transition-colors hover:bg-surface/10">
          <CloseIcon width={26} height={26} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <Image key={item.src} src={item.src} alt={item.alt} fill sizes="100vw" className="animate-[lightbox-in_0.5s_ease] object-contain px-2 sm:px-24" />
        <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="absolute left-2 top-1/2 hidden size-14 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-surface/25 text-surface transition-colors hover:bg-surface hover:text-ink sm:grid">
          <ChevronIcon width={24} height={24} className="rotate-180" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="absolute right-2 top-1/2 hidden size-14 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-surface/25 text-surface transition-colors hover:bg-surface hover:text-ink sm:grid">
          <ChevronIcon width={24} height={24} />
        </button>
      </div>

      <div className="flex min-h-20 shrink-0 flex-col items-center justify-center gap-1 px-6 py-4 text-center">
        <p className="max-w-2xl text-[0.95rem] text-surface/85">{item.alt}</p>
        {item.project ? (
          <Link href={`/projetos/${item.project.slug}`} onClick={onClose} className="text-sm text-areia underline underline-offset-4 hover:text-surface">
            Ver o projeto {item.project.title}
          </Link>
        ) : null}
        <div className="mt-2 flex gap-3 sm:hidden">
          <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="grid size-11 place-items-center rounded-full border border-surface/25">
            <ChevronIcon width={20} height={20} className="rotate-180" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="grid size-11 place-items-center rounded-full border border-surface/25">
            <ChevronIcon width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
