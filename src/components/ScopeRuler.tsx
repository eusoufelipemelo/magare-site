import { CheckIcon } from "@/components/icons";
import { siteConfig } from "@/site.config";

/**
 * As três formas de contratar como uma régua de escopo: cada serviço é uma cota que cobre
 * as etapas incluídas (Projeto, Móveis, Arquitetura, Execução). O escopo cresce de um para o outro.
 */
export function ScopeRuler({ detailed = false, headingLevel: H = "h3" }: { detailed?: boolean; headingLevel?: "h2" | "h3" }) {
  const { services, stages } = siteConfig;
  return (
    <div>
      <div className="hidden border-b border-line pb-3 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-12">
        <span className="text-sm text-muted">Serviço</span>
        <ol className="grid grid-cols-4 text-sm text-muted" aria-label="Etapas">
          {stages.map((s) => (
            <li key={s} className="border-l border-line pl-3 pr-2">
              {s}
            </li>
          ))}
        </ol>
      </div>
      <ul>
        {services.map((s) => {
          const covered = stages.slice(0, s.covers);
          return (
            <li key={s.title} id={s.title.toLowerCase().replace(/\s+/g, "-")} className="grid scroll-mt-28 gap-5 border-b border-line py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-12 md:py-11">
              <div>
                <H className="font-display text-[1.85rem] leading-tight text-ink sm:text-[2.1rem]">{s.title}</H>
                <p className="mt-1.5 text-muted">{s.scope}</p>
              </div>
              <div>
                <div className="relative h-5" role="img" aria-label={`Inclui: ${covered.join(", ")}`}>
                  <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-line" />
                  <span aria-hidden className="absolute left-0 top-0 h-full border-x-2 border-brand" style={{ width: `${(s.covers / stages.length) * 100}%` }}>
                    <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-brand" />
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted md:hidden">{covered.join(" + ")}</p>
                <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink">{s.description}</p>
                {detailed ? (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-bold text-ink">Para quem é</p>
                      <p className="mt-1.5 leading-relaxed text-muted">{s.forWhom}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">O que envolve</p>
                      <ul className="mt-1.5 space-y-1.5">
                        {s.includes.map((i) => (
                          <li key={i} className="flex gap-2.5 leading-relaxed text-muted">
                            <CheckIcon width={18} height={18} className="mt-1 shrink-0 text-brand" />
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
