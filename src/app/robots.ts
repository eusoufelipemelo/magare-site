import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/env";

// Liberado para buscadores e para os robôs de IA (GEO: ser citado no ChatGPT, Gemini, Perplexity, Claude...).
export const dynamic = "force-dynamic";

const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "DuckAssistBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  // cada grupo de user-agent é independente: repete o bloqueio de /api/ em todos
  return {
    rules: [
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: "/api/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl(),
  };
}
