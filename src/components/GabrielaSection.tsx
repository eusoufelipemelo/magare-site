import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { Container } from "./Container";
import { WhatsAppIcon } from "./icons";
import { SplitTitle } from "./SplitTitle";

/** Seção da arquiteta e empresária Gabriela Reis (Home e Sobre). */
export function GabrielaSection({ link = "sobre" }: { link?: "sobre" | "whatsapp" }) {
  const { expert } = siteConfig.about;
  const wa = whatsappUrl(siteConfig.contact.whatsapp, siteConfig.contact.whatsappMessage);
  return (
    <section aria-labelledby="gabriela" className="relative overflow-hidden bg-brand text-brand-contrast">
      <Container className="grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-32">
        {/* fotos: retrato próximo + Gabriela na CASACOR 2024 */}
        <div className="relative lg:order-2 lg:col-span-6 lg:col-start-7">
          <div data-reveal="image" className="relative ml-auto aspect-[4/5] w-[86%] overflow-hidden bg-ink/20 sm:w-[78%] lg:w-[84%]">
            <Image
              src="/equipe/gabriela-reis-retrato.jpg"
              alt="Retrato de Gabriela Reis, arquiteta e sócia da Magare"
              fill
              sizes="(min-width: 1024px) 38vw, 80vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
          <div
            data-reveal="image"
            style={{ "--d": "300ms" } as CSSProperties}
            className="absolute -bottom-10 left-0 aspect-[4/5] w-[44%] overflow-hidden border-[6px] border-brand bg-ink/20 sm:w-[38%] lg:-bottom-14 lg:w-[42%]"
          >
            <Image src="/equipe/gabriela-casacor.jpg" alt="Gabriela Reis sentada à mesa no ambiente da CASACOR 2024" fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
          </div>
          <p className="cota cota-on-dark absolute -bottom-20 right-0 w-[52%] sm:w-[58%] lg:-bottom-24">Gabriela Reis</p>
        </div>

        <div className="mt-16 lg:order-1 lg:col-span-5 lg:mt-0">
          <p data-reveal="fade" className="text-[0.95rem] text-areia">
            Quem assina os projetos
          </p>
          <SplitTitle id="gabriela" text={expert.name} className="mt-3 font-display text-[3rem] leading-[1.02] sm:text-7xl" />
          <p data-reveal="fade" className="mt-4 text-brand-contrast/80">
            {expert.credentials}
          </p>
          <div data-reveal="fade" className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-brand-contrast/90">
            <p>
              Gabriela começou na marcenaria, ao lado de Maicon, e viveu cada etapa do trabalho: o atendimento, o projeto, o orçamento, a produção e a
              montagem. Foi essa experiência que levou a Magare a unir móveis planejados e arquitetura.
            </p>
            <p>Hoje ela conduz os projetos pensando o espaço e o mobiliário como uma coisa só, a partir da rotina de quem vai viver ali.</p>
          </div>
          <blockquote data-reveal="fade" className="mt-10 border-l border-areia pl-6 font-display text-[1.5rem] italic leading-snug sm:text-[1.8rem]">
            <p>Uma casa não deve apenas ser bonita. Ela deve ter sentido para quem mora nela.</p>
          </blockquote>
          <div data-reveal="fade" className="mt-10">
            {link === "sobre" ? (
              <Link href="/sobre" className="btn btn-inverse">
                Conheça a história da Magare
              </Link>
            ) : wa ? (
              <a href={wa} target="_blank" rel="noopener" className="btn btn-inverse">
                <WhatsAppIcon />
                Conversar no WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
