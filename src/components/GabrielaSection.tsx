import Image from "next/image";
import Link from "next/link";
import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { Container } from "./Container";
import { WhatsAppIcon } from "./icons";

/** Seção da arquiteta e empresária Gabriela Reis (Home e Sobre). */
export function GabrielaSection({ link = "sobre" }: { link?: "sobre" | "whatsapp" }) {
  const { expert } = siteConfig.about;
  const wa = whatsappUrl(siteConfig.contact.whatsapp, siteConfig.contact.whatsappMessage);
  return (
    <section aria-labelledby="gabriela" className="bg-brand text-brand-contrast">
      <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-14 lg:gap-20 lg:py-28">
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden bg-ink/20 md:aspect-[3/4]">
            <Image
              src="/equipe/gabriela-reis.jpg"
              alt="Gabriela Reis, arquiteta e sócia da Magare, sentada diante de um painel de madeira"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[50%_22%]"
            />
          </div>
          <figcaption className="cota cota-on-dark mt-4">Gabriela Reis</figcaption>
        </figure>
        <div>
          <h2 id="gabriela" className="font-display text-[2.6rem] leading-[1.05] sm:text-6xl">
            {expert.name}
          </h2>
          <p className="mt-3 text-brand-contrast/80">{expert.credentials}</p>
          <div className="mt-8 max-w-xl space-y-4 text-[1.0625rem] leading-relaxed text-brand-contrast/90">
            <p>
              Gabriela começou na marcenaria, ao lado de Maicon, e viveu cada etapa do trabalho: o atendimento, o projeto, o orçamento, a produção e a
              montagem. Foi essa experiência que levou a Magare a unir móveis planejados e arquitetura.
            </p>
            <p>Hoje ela conduz os projetos pensando o espaço e o mobiliário como uma coisa só, a partir da rotina de quem vai viver ali.</p>
          </div>
          <blockquote className="mt-10 max-w-xl border-l-2 border-areia pl-5 font-display text-[1.45rem] italic leading-snug sm:text-[1.7rem]">
            <p>Uma casa não deve apenas ser bonita. Ela deve ter sentido para quem mora nela.</p>
          </blockquote>
          <div className="mt-10">
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
