import { getImageProps } from "next/image";

type Src = { src: string; width: number; height: number };

/**
 * Foto de fundo com direção de arte: uma foto horizontal no computador/tablet e outra
 * em pé no celular. Cada aparelho baixa só a sua versão.
 */
export function HeroPicture({ desktop, mobile, alt, className = "", eager = true, high = false }: { desktop: Src; mobile: Src; alt: string; className?: string; eager?: boolean; high?: boolean }) {
  const common = { alt, sizes: "100vw", quality: 75, loading: eager ? ("eager" as const) : undefined, fetchPriority: high ? ("high" as const) : undefined };
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, ...desktop });
  const {
    props: { srcSet: mobileSet, alt: imgAlt, ...rest },
  } = getImageProps({ ...common, ...mobile });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSet} />
      <source media="(max-width: 767px)" srcSet={mobileSet} />
      <img alt={imgAlt} {...rest} className={`absolute inset-0 size-full object-cover ${className}`} />
    </picture>
  );
}
