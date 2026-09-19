import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

/** Lista de canais de atendimento do site.config.ts (Home, Contato). */
export function ContactList({ large = false }: { large?: boolean }) {
  const c = siteConfig.contact;
  const a = c.address;
  const wa = whatsappUrl(c.whatsapp, c.whatsappMessage);
  const row = `flex gap-3.5 ${large ? "py-4" : "py-3"}`;
  const icon = "mt-0.5 shrink-0 text-brand";
  const label = "block text-sm text-muted";
  const value = `block font-medium text-ink ${large ? "text-lg" : ""}`;
  return (
    <ul className="divide-y divide-line">
      {wa ? (
        <li className={row}>
          <WhatsAppIcon className={icon} />
          <span>
            <span className={label}>WhatsApp</span>
            <a href={wa} target="_blank" rel="noopener" className={`${value} link`}>
              Enviar mensagem
            </a>
          </span>
        </li>
      ) : null}
      {c.phone ? (
        <li className={row}>
          <PhoneIcon className={icon} />
          <span>
            <span className={label}>Telefone</span>
            <a href={`tel:${c.phoneHref}`} className={`${value} hover:text-brand`}>
              {c.phone}
            </a>
          </span>
        </li>
      ) : null}
      {c.email ? (
        <li className={row}>
          <MailIcon className={icon} />
          <span className="min-w-0">
            <span className={label}>E-mail</span>
            <a href={`mailto:${c.email}`} className={`${value} break-all hover:text-brand`}>
              {c.email}
            </a>
          </span>
        </li>
      ) : null}
      {a.street ? (
        <li className={row}>
          <PinIcon className={icon} />
          <span>
            <span className={label}>Endereço</span>
            <span className={value}>
              {a.street}
              {a.neighborhood ? `, ${a.neighborhood}` : ""}, {a.city}/{a.state}
            </span>
            {c.mapsUrl ? (
              <a href={c.mapsUrl} target="_blank" rel="noopener" className="link mt-1 inline-block text-sm">
                Ver no mapa
              </a>
            ) : null}
          </span>
        </li>
      ) : null}
      {c.hours ? (
        <li className={row}>
          <ClockIcon className={icon} />
          <span>
            <span className={label}>Horário</span>
            <span className={value}>{c.hours}</span>
          </span>
        </li>
      ) : null}
    </ul>
  );
}
