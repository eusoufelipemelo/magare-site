import Link from "next/link";
import { breadcrumbLd } from "@/lib/jsonld";
import { ChevronIcon } from "./icons";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

/** Trilha de navegação + BreadcrumbList em JSON-LD. O último item é a página atual. */
export function Breadcrumbs({ items, jsonLd = true }: { items: Crumb[]; jsonLd?: boolean }) {
  return (
    <>
      <nav aria-label="Trilha de navegação" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              // no celular o item atual some quando é longo (o h1 logo abaixo já diz onde a pessoa está)
              <li key={it.path} className={`flex min-w-0 items-center gap-1.5 ${last && items.length > 3 ? "max-sm:hidden" : ""}`}>
                {i > 0 ? <ChevronIcon width={14} height={14} className="shrink-0 text-muted/70" /> : null}
                {last ? (
                  <span aria-current="page" className="line-clamp-1 text-ink">
                    {it.name}
                  </span>
                ) : (
                  <Link href={it.path} className="hover:text-ink hover:underline">
                    {it.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {jsonLd ? <JsonLd data={breadcrumbLd(items)} /> : null}
    </>
  );
}
