import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site.config";

/**
 * Logo original da Magare (arquivos do cliente em /public/marca, sem redesenho).
 * - tone "dark": versão grafite (fundo claro); "light": versão off-white (sobre fotos);
 * - inverse: versão com o descritor "Móveis planejados & arquitetura" em areia, para o rodapé.
 */
export function Logo({ inverse = false, light = false }: { inverse?: boolean; light?: boolean }) {
  const { name } = siteConfig;
  if (inverse) {
    return (
      <Link href="/" className="inline-flex shrink-0 items-center rounded-sm" aria-label={`${name}, página inicial`}>
        <Image src="/marca/magare-slogan-areia.svg" alt="" width={1302} height={417} unoptimized className="h-auto w-[210px] sm:w-[250px]" />
      </Link>
    );
  }
  return (
    <Link href="/" className="relative inline-flex shrink-0 items-center rounded-sm" aria-label={`${name}, página inicial`}>
      <Image
        src={siteConfig.logo.src}
        alt=""
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        unoptimized
        loading="eager"
        className={`h-9 w-auto transition-opacity duration-500 sm:h-10 ${light ? "opacity-0" : "opacity-100"}`}
      />
      <Image
        src="/marca/magare-off-white.svg"
        alt=""
        width={1317}
        height={422}
        unoptimized
        loading="eager"
        className={`absolute inset-0 h-9 w-auto transition-opacity duration-500 sm:h-10 ${light ? "opacity-100" : "opacity-0"}`}
      />
    </Link>
  );
}
