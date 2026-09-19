import type { Metadata } from "next";
import Image from "next/image";
import { ContactList } from "@/components/ContactList";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CheckIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { absoluteUrl } from "@/lib/env";
import { whatsappUrl } from "@/lib/format";
import { organizationId } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const intro = "O atendimento da Magare começa pelo WhatsApp. Conte qual ambiente você quer transformar e em que bairro de Brasília ele fica.";

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description: "Fale com a Magare pelo WhatsApp (61) 99253-1648 e peça um orçamento de móveis planejados ou projeto de arquitetura em Brasília.",
  path: "/contato",
});

export default function ContactPage() {
  const c = siteConfig.contact;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const instagram = siteConfig.social.find((s) => s.label === "Instagram");
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: absoluteUrl("/contato"), about: { "@id": organizationId() } }} />
      <PageHeader
        title="Vamos conversar sobre o seu espaço"
        intro={intro}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Contato", path: "/contato" },
        ]}
      >
        {wa ? (
          <div className="mt-8">
            <a href={wa} target="_blank" rel="noopener" className="btn btn-primary w-full sm:w-auto">
              <WhatsAppIcon />
              Conversar no WhatsApp
            </a>
          </div>
        ) : null}
      </PageHeader>

      <Container className="grid gap-14 py-14 sm:py-20 md:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,4fr)] lg:gap-14">
        <section aria-labelledby="canais">
          <h2 id="canais" className="font-display text-[1.75rem] text-ink">
            Canais de atendimento
          </h2>
          <div className="mt-4">
            <ContactList large />
          </div>
          <ul className="divide-y divide-line border-y border-line">
            <li className="flex gap-3.5 py-4">
              <PinIcon className="mt-0.5 shrink-0 text-brand" />
              <span>
                <span className="block text-sm text-muted">Região atendida</span>
                <span className="block text-lg font-bold text-ink">{c.areaServed}</span>
              </span>
            </li>
            {instagram ? (
              <li className="flex gap-3.5 py-4">
                <svg aria-hidden width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="mt-0.5 shrink-0 text-brand">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
                <span>
                  <span className="block text-sm text-muted">Instagram</span>
                  <a href={instagram.href} target="_blank" rel="noopener me" className="link block text-lg font-bold">
                    @magareambientesplanejados
                  </a>
                </span>
              </li>
            ) : null}
          </ul>
        </section>

        <section aria-labelledby="como">
          <h2 id="como" className="font-display text-[1.75rem] text-ink">
            Para agilizar o atendimento
          </h2>
          <ul className="mt-6 space-y-5">
            {[
              "Diga seu nome e o bairro onde fica o imóvel.",
              "Conte qual ambiente quer transformar e se é casa, apartamento ou espaço comercial.",
              "Se tiver, envie fotos, medidas ou a planta do espaço.",
            ].map((t) => (
              <li key={t} className="flex gap-3.5">
                <CheckIcon className="mt-1 shrink-0 text-brand" />
                <span className="leading-relaxed text-ink">{t}</span>
              </li>
            ))}
          </ul>
          <h2 className="mt-12 font-display text-[1.75rem] text-ink">Regiões com foco de atendimento</h2>
          <p className="mt-3 leading-relaxed text-muted">{c.regions.join(", ")} e regiões próximas.</p>
        </section>

        <figure className="md:col-span-2 lg:col-span-1">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-alt">
            <Image src="/projetos/casa-alphaville/02.jpg" alt="Corredor da cozinha com ilha e janela do piso ao teto para a paisagem" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="cota mt-4">Cozinha, Casa no Alphaville</figcaption>
        </figure>
      </Container>
    </>
  );
}
