import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  const wa = whatsappUrl(siteConfig.contact.whatsapp, siteConfig.contact.whatsappMessage);
  return <SiteNav links={siteConfig.nav} whatsappHref={wa} ctaLabel="WhatsApp" />;
}
