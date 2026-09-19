import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { WhatsAppIcon } from "./icons";

/** Botão fixo de WhatsApp (canto inferior direito), no verde da marca. Some quando o número está vazio. */
export function WhatsAppFloat() {
  const href = whatsappUrl(siteConfig.contact.whatsapp, siteConfig.contact.whatsappMessage);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-4 right-4 z-30 grid size-14 place-items-center rounded-full bg-brand text-brand-contrast shadow-[0_10px_28px_-8px_rgb(34_30_31/0.45)] transition-colors hover:bg-ink sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
