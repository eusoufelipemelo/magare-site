import Image from "next/image";
import { siteConfig } from "@/site.config";
import { Container } from "./Container";
import { LeadForm } from "./LeadForm";
import { SplitTitle } from "./SplitTitle";

/** Seção de cadastro de lead: foto real de um lado, formulário do outro. */
export function LeadSection({ id = "solicite", image = { src: "/projetos/area-gourmet/03.jpg", alt: "Nicho de madeira iluminado sobre armários cinza" } }: { id?: string; image?: { src: string; alt: string } }) {
  const c = siteConfig.contact;
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-20 bg-surface">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div data-reveal="image" className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-full">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
        </div>
        <Container className="py-16 sm:py-20 lg:mx-0 lg:max-w-3xl lg:py-28 lg:pl-16 xl:pl-24">
          <p data-reveal="fade" className="text-[0.95rem] text-brand">
            Solicite seu projeto
          </p>
          <SplitTitle id={`${id}-titulo`} text="Conte o que você quer transformar" className="mt-3 max-w-xl font-display text-[2.4rem] leading-[1.08] text-ink sm:text-[3.2rem]" />
          <p data-reveal="fade" className="mt-5 max-w-xl leading-relaxed text-muted">
            Preencha os campos e a mensagem chega organizada no WhatsApp da Magare, {c.phone}. A conversa continua por lá.
          </p>
          <div data-reveal="fade" className="mt-10">
            <LeadForm whatsapp={c.whatsapp} regions={c.regions} />
          </div>
        </Container>
      </div>
    </section>
  );
}
