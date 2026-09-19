import Image from "next/image";
import Link from "next/link";
import { formatDate, isoDate, truncate } from "@/lib/format";
import type { PostSummary } from "@/lib/outbox";

/** Cartão de artigo. `featured` = destaque horizontal no topo do blog. */
export function PostCard({ post, featured = false, headingLevel = "h2" }: { post: PostSummary; featured?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const date = post.publishedAt ?? post.updatedAt;
  const href = `/blog/${post.slug}`;
  // o resumo (excerpt) é escrito para listagens; a resposta rápida fica como reserva
  const summary = post.excerpt || post.answerSummary;
  const showMedia = Boolean(post.cover) || !featured;
  return (
    <article
      className={`group relative flex flex-col ${featured && showMedia ? "gap-6 md:grid md:grid-cols-[1.25fr_1fr] md:items-center md:gap-10" : featured ? "max-w-3xl gap-4" : "gap-4"}`}
    >
      {showMedia ? (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] bg-surface-alt">
        {post.cover ? (
          <Image
            src={post.cover.url}
            alt={post.cover.alt}
            fill
            sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={featured}
          />
        ) : (
          <div aria-hidden className="absolute inset-0 grid place-items-center bg-brand-soft">
            <span className="px-6 text-center font-display text-xl font-semibold text-brand">{post.category ?? "Artigo"}</span>
          </div>
        )}
      </div>
      ) : null}
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          {post.category ? <span className="font-semibold text-brand">{post.category}</span> : null}
          {date ? <time dateTime={isoDate(date) ?? undefined}>{formatDate(date)}</time> : null}
          <span>{post.readingMinutes} min</span>
        </div>
        <Heading className={`font-display font-bold leading-snug text-ink ${featured ? (showMedia ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl") : "text-xl"}`}>
          <Link href={href} className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand">
            {post.title}
          </Link>
        </Heading>
        {summary ? <p className={`leading-relaxed text-muted ${featured ? "text-lg" : "text-[0.975rem]"}`}>{truncate(summary, featured ? 260 : 150)}</p> : null}
      </div>
    </article>
  );
}
