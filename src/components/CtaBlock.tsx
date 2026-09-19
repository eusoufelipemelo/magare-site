import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";

/** Chamada de contato (WhatsApp, telefone, e-mail) com os textos do site.config.ts > cta. */
export function CtaBlock({ title = siteConfig.cta.title, text = siteConfig.cta.text, as: Heading = "h2" }: { title?: string; text?: string; as?: "h2" | "h3" }) {
  const c = siteConfig.contact;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  return (
    <section aria-label="Fale com a Magare" className="bg-brand text-brand-contrast">
      <div className="grid gap-8 px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <Heading className="font-display text-[2rem] leading-[1.12] sm:text-[2.6rem]">{title}</Heading>
          <p className="mt-4 max-w-xl text-brand-contrast/85">{text}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          {wa ? (
            <a href={wa} target="_blank" rel="noopener" className="btn btn-inverse w-full md:w-auto">
              <WhatsAppIcon />
              {siteConfig.cta.button}
            </a>
          ) : null}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[0.95rem] md:justify-end">
            {c.phone ? (
              <a href={`tel:${c.phoneHref}`} className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
                <PhoneIcon /> {c.phone}
              </a>
            ) : null}
            {c.email ? (
              <a href={`mailto:${c.email}`} className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
                <MailIcon /> {c.email}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
