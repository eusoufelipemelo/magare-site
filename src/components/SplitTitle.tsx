import { Fragment, type CSSProperties } from "react";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

/** Título que sobe palavra por palavra quando entra na tela (ver .split-word em globals.css). */
export function SplitTitle({
  text,
  as: Tag = "h2",
  className = "",
  id,
  delay = 0,
}: {
  text: string;
  as?: Tag;
  className?: string;
  id?: string;
  /** Atraso inicial em ms. */
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag id={id} className={className} data-reveal="words" style={{ "--d": `${delay}ms` } as CSSProperties}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split-word">
            <span style={{ "--i": i } as CSSProperties}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
