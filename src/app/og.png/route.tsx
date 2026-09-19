import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

// Imagem padrão de compartilhamento (1200x630) com nome, frase e cores do site.config.ts.
export const dynamic = "force-static";

export function GET() {
  const t = siteConfig.theme;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: t.brand, color: t.brandContrast, padding: "72px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: t.brandContrast, color: t.brand, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, fontWeight: 700 }}>
            {siteConfig.name.trim().charAt(0).toUpperCase()}
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 980 }}>{siteConfig.tagline}</div>
        <div style={{ display: "flex", fontSize: 26, opacity: 0.8 }}>{siteConfig.url.replace(/^https?:\/\/(www\.)?/, "")}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
