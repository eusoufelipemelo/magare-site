import Image from "next/image";
import Link from "next/link";
import { coverOf, type Project } from "@/content/projetos";

/** Card de projeto: foto de capa recortada e, abaixo, nome e local. */
export function ProjectCard({
  project,
  className = "",
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 82vw",
  headingLevel: H = "h3",
}: {
  project: Project;
  className?: string;
  aspect?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
}) {
  const cover = coverOf(project);
  return (
    <article className={`group ${className}`}>
      <Link href={`/projetos/${project.slug}`} className="block rounded-sm">
        <div className={`relative overflow-hidden bg-surface-alt ${aspect}`}>
          <Image src={cover.src} alt={cover.alt} fill sizes={sizes} className="object-cover transition-[filter] duration-300 group-hover:brightness-[0.92]" />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <H className="font-display text-[1.45rem] leading-snug text-ink decoration-salvia decoration-1 underline-offset-[5px] group-hover:underline">{project.title}</H>
          <p className="shrink-0 text-sm text-muted">{project.kind}</p>
        </div>
        <p className="mt-1 text-[0.95rem] text-muted">{project.rooms.slice(0, 3).join(", ")}</p>
      </Link>
    </article>
  );
}
