"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/content/projetos";
import { Lightbox } from "./Lightbox";

const INITIAL = 14;

/**
 * Galeria da Home: filtros por ambiente, mosaico alinhado (fotos em pé ocupam 1 coluna,
 * deitadas ocupam 2) e visualizador em tela cheia.
 */
export function Gallery({ items, categories }: { items: GalleryItem[]; categories: readonly GalleryCategory[] }) {
  const [filter, setFilter] = useState<GalleryCategory | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const filtered = useMemo(() => (filter ? items.filter((i) => i.category === filter) : items), [filter, items]);
  const visible = expanded || filter ? filtered : filtered.slice(0, INITIAL);

  return (
    <>
      <div role="group" aria-label="Filtrar fotos por ambiente" className="snap-row -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {[null, ...categories].map((c) => {
          const active = filter === c;
          return (
            <button
              key={c ?? "todos"}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c)}
              className={`min-h-11 shrink-0 cursor-pointer rounded-full border px-5 text-[0.95rem] transition-colors duration-300 ${
                active ? "border-surface bg-surface text-ink" : "border-surface/25 text-surface/80 hover:border-surface/60 hover:text-surface"
              }`}
            >
              {c ?? "Todos os ambientes"}
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid grid-flow-dense auto-rows-[128px] grid-cols-2 gap-2 sm:auto-rows-[200px] sm:gap-3 md:auto-rows-[240px] lg:auto-rows-[205px] lg:grid-cols-4 lg:gap-4">
        {visible.map((img, i) => {
          const landscape = img.width > img.height;
          return (
            <li key={`${filter ?? "todos"}-${img.src}`} className={`row-span-2 ${landscape ? "col-span-2" : ""} animate-[gallery-in_0.7s_ease_both]`} style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="zoom-media group relative block size-full cursor-zoom-in overflow-hidden bg-surface/5"
                aria-label={`Ampliar: ${img.alt}`}
              >
                <Image src={img.src} alt={img.alt} fill sizes={landscape ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} className="object-cover" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-left text-sm text-surface opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.project.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {!expanded && !filter && filtered.length > INITIAL ? (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setExpanded(true)} className="btn cursor-pointer border border-surface/40 text-surface hover:bg-surface hover:text-ink">
            Ver todas as {filtered.length} fotos
          </button>
        </div>
      ) : null}

      <Lightbox items={visible} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
