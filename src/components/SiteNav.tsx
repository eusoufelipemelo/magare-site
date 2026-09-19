"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavLink } from "@/site.config";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Rotas sem foto no topo (artigo do blog): cabeçalho sempre sólido e no fluxo da página. */
function hasSolidTop(pathname: string) {
  return /^\/blog\/[^/]+/.test(pathname);
}

/**
 * Cabeçalho: transparente sobre a foto do topo, sólido (off-white) depois de rolar,
 * e menu de tela cheia no celular.
 */
export function SiteNav({ links, whatsappHref, ctaLabel }: { links: NavLink[]; whatsappHref: string | null; ctaLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // fecha o menu ao trocar de página
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [open]);

  const solidRoute = hasSolidTop(pathname);
  const solid = solidRoute || scrolled || open;
  const light = !solid;

  return (
    <header
      className={`${solidRoute ? "sticky" : "fixed"} inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? "border-b border-line/70 bg-surface/92 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className={`relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-500 sm:px-6 lg:px-8 ${solid ? "h-16 sm:h-[4.5rem]" : "h-20 sm:h-24"}`}>
        <Logo light={light} />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-sm px-3.5 py-2 text-[0.95rem] tracking-[0.01em] transition-colors duration-300 after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-500 ${
                      light ? "text-surface/85 after:bg-surface hover:text-surface" : "text-muted after:bg-brand hover:text-ink"
                    } ${active ? `after:scale-x-100 ${light ? "text-surface" : "text-ink"}` : "after:scale-x-0 hover:after:scale-x-100"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener"
              className={`btn hidden min-h-11 px-5 text-[0.95rem] sm:inline-flex ${
                light ? "border border-surface/50 text-surface hover:bg-surface hover:text-ink" : "btn-primary"
              }`}
            >
              <WhatsAppIcon />
              {ctaLabel}
            </a>
          ) : null}
          <button
            type="button"
            className={`inline-grid size-11 cursor-pointer place-items-center rounded-full transition-colors lg:hidden ${light ? "text-surface" : "text-ink"}`}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        data-lenis-prevent
        className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-surface sm:top-[4.5rem] lg:hidden"
      >
        <nav aria-label="Principal (celular)" className="mx-auto flex min-h-full max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6">
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <Link
                  href={l.href}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  className="flex min-h-[4.25rem] items-center font-display text-[2rem] text-ink aria-[current=page]:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noopener" className="btn btn-primary mt-auto w-full">
              <WhatsAppIcon />
              Conversar no WhatsApp
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
