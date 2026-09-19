"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavLink } from "@/site.config";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav({ links, whatsappHref, ctaLabel }: { links: NavLink[]; whatsappHref: string | null; ctaLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // fecha o menu ao trocar de página
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav aria-label="Principal" className="hidden lg:block">
        <ul className="flex items-center gap-0.5">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-sm px-3 py-2 text-[0.95rem] underline-offset-[6px] transition-colors ${
                    active ? "text-ink underline decoration-salvia decoration-2" : "text-muted hover:text-ink"
                  }`}
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
          <a href={whatsappHref} target="_blank" rel="noopener" className="btn btn-primary hidden min-h-11 px-4 text-[0.95rem] sm:inline-flex">
            <WhatsAppIcon />
            {ctaLabel}
          </a>
        ) : null}
        <button
          type="button"
          className="inline-grid size-11 cursor-pointer place-items-center rounded-full text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
        </button>
      </div>

      <div id="menu-mobile" hidden={!open} className="absolute inset-x-0 top-full border-b border-line bg-surface shadow-[0_12px_24px_-16px_rgb(0_0_0/0.25)] lg:hidden">
        <nav aria-label="Principal (celular)" className="mx-auto max-w-7xl px-4 pb-6 pt-2 sm:px-6">
          <ul className="divide-y divide-line">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  className="flex min-h-14 items-center font-display text-2xl text-ink aria-[current=page]:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noopener" className="btn btn-primary mt-4 w-full">
              <WhatsAppIcon />
              {ctaLabel}
            </a>
          ) : null}
        </nav>
      </div>
    </>
  );
}
