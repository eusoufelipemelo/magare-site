import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site.config";

/**
 * Logo original da Magare (arquivos do cliente em /public/marca, sem redesenho).
 * - padrão: versão sem slogan em grafite, para o cabeçalho claro;
 * - inverse: versão com o descritor "Móveis planejados & arquitetura" em areia, para fundos escuros.
 */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  const { name } = siteConfig;
  return (
    <Link href="/" className="inline-flex shrink-0 items-center rounded-sm" aria-label={`${name}, página inicial`}>
      {inverse ? (
        <Image src="/marca/magare-slogan-areia.svg" alt="" width={1302} height={417} unoptimized className="h-auto w-[200px] sm:w-[230px]" />
      ) : (
        <Image src={siteConfig.logo.src} alt="" width={siteConfig.logo.width} height={siteConfig.logo.height} unoptimized loading="eager" className="h-9 w-auto sm:h-10" />
      )}
    </Link>
  );
}
