"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Efeitos do site inteiro:
 * - rolagem suave (Lenis), desligada para quem prefere menos movimento;
 * - revelação de títulos, textos e imagens marcados com data-reveal quando entram na tela.
 *   Títulos h1/h2 sem marcação (ex.: blog) ganham a revelação suave automaticamente.
 */
export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, anchors: { offset: -90 } });
    window.__lenis = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    // página nova: recalcula até onde dá para rolar (o Lenis guarda o limite da página anterior)
    const frame = requestAnimationFrame(() => window.__lenis?.resize());
    const onLoad = () => window.__lenis?.resize();
    window.addEventListener("load", onLoad);
    document.querySelectorAll("main h1:not([data-reveal]), main h2:not([data-reveal])").forEach((el) => {
      if (!el.closest("[data-reveal]")) el.setAttribute("data-reveal", "fade");
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-revealed", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
