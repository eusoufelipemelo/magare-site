import Link from "next/link";

/** Paginação com links reais (rastreáveis). `hrefFor(n)` monta a URL de cada página. */
export function Pagination({ page, totalPages, hrefFor }: { page: number; totalPages: number; hrefFor: (n: number) => string }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1);
  const item = "inline-grid min-h-11 min-w-11 place-items-center rounded-[var(--radius)] px-3 text-[0.95rem] font-medium";
  return (
    <nav aria-label="Paginação" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} rel="prev" className={`${item} border border-line hover:border-ink`}>
          Anterior
        </Link>
      ) : null}
      {pages.map((n, i) => (
        <span key={n} className="contents">
          {i > 0 && n - pages[i - 1] > 1 ? <span className="px-1 text-muted">…</span> : null}
          {n === page ? (
            <span aria-current="page" className={`${item} bg-ink text-surface`}>
              {n}
            </span>
          ) : (
            <Link href={hrefFor(n)} className={`${item} border border-line hover:border-ink`} aria-label={`Página ${n}`}>
              {n}
            </Link>
          )}
        </span>
      ))}
      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} rel="next" className={`${item} border border-line hover:border-ink`}>
          Próxima
        </Link>
      ) : null}
    </nav>
  );
}
