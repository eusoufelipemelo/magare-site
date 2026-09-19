import { whatsappUrl } from "@/lib/format";
import { siteConfig } from "@/site.config";
import { Logo } from "./Logo";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  const wa = whatsappUrl(siteConfig.contact.whatsapp, siteConfig.contact.whatsappMessage);
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Logo />
        <SiteNav links={siteConfig.nav} whatsappHref={wa} ctaLabel="WhatsApp" />
      </div>
    </header>
  );
}
