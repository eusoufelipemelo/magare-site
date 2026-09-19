import Link from "next/link";
import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

const legal = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "LGPD", href: "/lgpd" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export function SiteFooter() {
  const c = siteConfig.contact;
  const a = c.address;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-ink text-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-12 pt-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1.3fr] lg:px-8 lg:pt-20">
        <div>
          <Logo inverse />
          <p className="mt-6 max-w-xs font-display text-xl leading-snug text-surface/90">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-surface/70">
            Arquitetura, projeto e móveis planejados para casas, apartamentos e espaços comerciais em Brasília.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-sans text-[0.95rem] font-bold text-areia">Navegação</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 text-[0.95rem] md:grid-cols-1">
            {siteConfig.nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center text-surface/80 underline-offset-4 hover:text-surface hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-[0.95rem] font-bold text-areia">Atendimento</h2>
          <address className="mt-4 space-y-3 text-[0.95rem] not-italic text-surface/80">
            {wa ? (
              <p className="flex gap-3">
                <WhatsAppIcon className="mt-0.5 shrink-0 text-surface/60" />
                <a href={wa} target="_blank" rel="noopener" className="hover:text-surface hover:underline">
                  WhatsApp {c.phone}
                </a>
              </p>
            ) : c.phone ? (
              <p className="flex gap-3">
                <PhoneIcon className="mt-0.5 shrink-0 text-surface/60" />
                <a href={`tel:${c.phoneHref}`} className="hover:text-surface hover:underline">
                  {c.phone}
                </a>
              </p>
            ) : null}
            {c.email ? (
              <p className="flex gap-3">
                <MailIcon className="mt-0.5 shrink-0 text-surface/60" />
                <a href={`mailto:${c.email}`} className="break-all hover:text-surface hover:underline">
                  {c.email}
                </a>
              </p>
            ) : null}
            <p className="flex gap-3">
              <PinIcon className="mt-0.5 shrink-0 text-surface/60" />
              <span>
                {a.street ? (
                  <>
                    {a.street}
                    {a.neighborhood ? `, ${a.neighborhood}` : ""}
                    <br />
                  </>
                ) : null}
                {c.areaServed}
              </span>
            </p>
            {c.hours ? (
              <p className="flex gap-3">
                <ClockIcon className="mt-0.5 shrink-0 text-surface/60" />
                <span>{c.hours}</span>
              </p>
            ) : null}
          </address>
          {siteConfig.social.length ? (
            <ul className="mt-5 flex flex-wrap gap-x-5 text-[0.95rem]">
              {siteConfig.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener me" className="inline-flex min-h-10 items-center text-surface/85 underline underline-offset-4 decoration-surface/30 hover:text-surface hover:decoration-surface">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="border-t border-surface/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 pb-24 text-sm text-surface/60 sm:px-6 sm:pb-7 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            © {year} {siteConfig.legalName || siteConfig.name}
          </p>
          <nav aria-label="Documentos legais">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-8 items-center hover:text-surface hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>
            Desenvolvido por:{" "}
            <a href="https://www.outboxgroup.com.br" target="_blank" rel="noopener" className="text-surface/85 underline decoration-surface/30 underline-offset-4 hover:text-surface hover:decoration-surface">
              OutBox Soluções Digitais
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
