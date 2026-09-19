import Image from "next/image";
import Link from "next/link";
import { coverOf, heroOf, type Project } from "@/content/projetos";

/** Card de projeto com a foto ocupando todo o espaço e o título sobre ela. */
export function ProjectTile({
  project,
  className = "",
  sizes = "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 85vw",
  wide = false,
  headingLevel: H = "h3",
}: {
  project: Project;
  className?: string;
  sizes?: string;
  /** Usa a foto horizontal do projeto (cards largos). */
  wide?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const img = wide ? heroOf(project) : coverOf(project);
  return (
    <article className={`group relative overflow-hidden bg-ink ${className}`} data-reveal="image">
      <Link href={`/projetos/${project.slug}`} className="zoom-media absolute inset-0 block">
        <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" />
        <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgb(34_30_31/0.85),rgb(34_30_31/0.1)_55%,transparent)] transition-opacity duration-700 group-hover:opacity-90" />
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
          <span>
            <span className="block text-sm text-surface/75">
              {project.kind === "Mostra de decoração" ? project.kind : `${project.kind}, ${project.place}`}
            </span>
            <H className="mt-1.5 font-display text-[1.7rem] leading-tight text-surface sm:text-[2rem]">{project.title}</H>
            <span className="mt-2 block text-[0.95rem] text-surface/70">{project.rooms.slice(0, 3).join(", ")}</span>
          </span>
          <span aria-hidden className="grid size-12 shrink-0 translate-x-2 place-items-center rounded-full border border-surface/40 text-surface opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </span>
        </span>
      </Link>
    </article>
  );
}
