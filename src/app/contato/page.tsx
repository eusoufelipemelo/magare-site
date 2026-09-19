import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { PageHeader } from "@/components/PageHeader";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { SplitTitle } from "@/components/SplitTitle";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { absoluteUrl } from "@/lib/env";
import { whatsappUrl } from "@/lib/format";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const intro = "Conte qual ambiente você quer transformar e em que bairro de Brasília ele fica. O atendimento da Magare continua pelo WhatsApp.";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description: "Fale com a Magare pelo WhatsApp (61) 99253-1648 e peça um orçamento de móveis planejados ou projeto de arquitetura em Brasília.",
  path: "/contato",
});

export default function ContactPage() {
  const c = siteConfig.contact;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const instagram = siteConfig.social.find((s) => s.label === "Instagram");
  const row = "flex gap-4 border-b border-line py-5";
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: absoluteUrl("/contato"), about: { "@id": organizationId() } }} />
      <PageHeader
        title="Vamos conversar sobre o seu espaço"
        intro={intro}
        image={{ src: "/projetos/area-gourmet/01.jpg", alt: "Área gourmet com churrasqueira, bancada extensa e janela para a área verde" }}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]}
      />

      <section aria-labelledby="formulario" className="py-20 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SplitTitle id="formulario" text="Solicite seu projeto" className="font-display text-[2.4rem] leading-tight text-ink sm:text-[3.4rem]" />
            <p data-reveal="fade" className="mt-4 max-w-xl leading-relaxed text-muted">
              A mensagem chega organizada no WhatsApp da Magare. Os dados não ficam guardados no site.
            </p>
            <div data-reveal="fade" className="mt-10">
              <LeadForm whatsapp={c.whatsapp} regions={c.regions} />
            </div>
          </div>

          <aside aria-labelledby="canais" className="lg:col-span-4 lg:col-start-9">
            <div className="bg-surface-alt p-7 sm:p-9 lg:sticky lg:top-28">
              <h2 id="canais" className="font-display text-[1.9rem] text-ink">
                Canais de atendimento
              </h2>
              <ul className="mt-4 border-t border-line">
                {wa ? (
                  <li className={row}>
                    <WhatsAppIcon className="mt-0.5 shrink-0 text-brand" />
                    <span>
                      <span className="block text-sm text-muted">WhatsApp</span>
                      <a href={wa} target="_blank" rel="noopener" className="link block text-lg font-bold">
                        {c.phone}
                      </a>
                    </span>
                  </li>
                ) : null}
                <li className={row}>
                  <PhoneIcon className="mt-0.5 shrink-0 text-brand" />
                  <span>
                    <span className="block text-sm text-muted">Telefone</span>
                    <a href={`tel:${c.phoneHref}`} className="block text-lg font-bold text-ink hover:text-brand">
                      {c.phone}
                    </a>
                  </span>
                </li>
                {instagram ? (
                  <li className={row}>
                    <svg aria-hidden width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="mt-0.5 shrink-0 text-brand">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                    </svg>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">Instagram</span>
                      <a href={instagram.href} target="_blank" rel="noopener me" className="link block break-words text-lg font-bold">
                        @magareambientesplanejados
                      </a>
                    </span>
                  </li>
                ) : null}
                <li className={row}>
                  <PinIcon className="mt-0.5 shrink-0 text-brand" />
                  <span>
                    <span className="block text-sm text-muted">Região atendida</span>
                    <span className="block text-lg font-bold text-ink">{c.areaServed}</span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="regioes" className="border-t border-line bg-surface-alt py-24 sm:py-32">
        <Container>
          <SplitTitle id="regioes" text="Onde atendemos" className="font-display text-[2.4rem] leading-tight text-ink sm:text-[3.6rem]" />
          <p data-reveal="fade" className="mt-4 max-w-xl leading-relaxed text-muted">
            Brasília e entorno, com foco nestas regiões. Escolha a sua para começar a conversa.
          </p>
          <div data-reveal="fade" className="mt-12">
            <ServiceAreaMap regions={c.regionPoints} whatsapp={c.whatsapp} />
          </div>
        </Container>
      </section>
    </>
  );
}
