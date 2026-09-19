"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectImage } from "@/content/projetos";
import { Lightbox } from "./Lightbox";

/** Fotos do projeto em duas colunas equilibradas; cada foto abre em tela cheia. */
export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const columns: { img: ProjectImage; i: number }[][] = [[], []];
  const heights = [0, 0];
  images.forEach((img, i) => {
    const c = heights[0] <= heights[1] ? 0 : 1;
    columns[c].push({ img, i });
    heights[c] += img.height / img.width;
  });
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:gap-8">
        {columns.map((col, c) => (
          <div key={c} className="flex flex-col gap-3 sm:gap-6 lg:gap-8">
            {col.map(({ img, i }) => (
              <button key={img.src} type="button" onClick={() => setOpen(i)} aria-label={`Ampliar: ${img.alt}`} className="zoom-media block cursor-zoom-in overflow-hidden bg-surface-alt" data-reveal="image">
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} loading={i < 2 ? "eager" : "lazy"} sizes="(min-width: 1280px) 600px, (min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
              </button>
            ))}
          </div>
        ))}
      </div>
      <Lightbox items={images} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
    </>
  );
}
