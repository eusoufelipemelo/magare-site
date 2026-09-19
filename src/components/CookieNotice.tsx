"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "magare-aviso-cookies";

/** Aviso discreto: o site não usa cookies de publicidade nem de rastreamento. */
export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setShow(true), 1800);
        return () => clearTimeout(t);
      }
    } catch {
      // armazenamento bloqueado: não mostra o aviso de novo a cada página
    }
  }, []);

  if (!show) return null;

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setShow(false);
  }

  return (
    <div role="region" aria-label="Aviso sobre cookies" className="fixed bottom-4 left-4 right-20 z-30 max-w-sm animate-[gallery-in_0.6s_ease_both] bg-ink p-5 text-surface shadow-[0_18px_40px_-16px_rgb(34_30_31/0.6)] sm:bottom-6 sm:left-6 sm:right-auto">
      <p className="text-[0.95rem] leading-relaxed text-surface/85">
        Este site não usa cookies de publicidade nem de rastreamento, só o necessário para funcionar. Saiba mais na{" "}
        <Link href="/politica-de-cookies" className="text-surface underline underline-offset-4">
          Política de Cookies
        </Link>
        .
      </p>
      <button type="button" onClick={dismiss} className="btn mt-4 min-h-10 cursor-pointer bg-surface px-5 text-[0.95rem] text-ink hover:bg-areia">
        Entendi
      </button>
    </div>
  );
}
