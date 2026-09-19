import type { NextConfig } from "next";

// Robôs que recebem o HTML completo (metadados no <head>, sem streaming): os padrões do Next + robôs de IA.
const HTML_LIMITED_BOTS =
  /[\w-]+-Google|Google-[\w-]+|Googlebot|Chrome-Lighthouse|Slurp|DuckDuckBot|DuckAssistBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|meta-externalagent|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|GPTBot|OAI-SearchBot|ChatGPT-User|PerplexityBot|Perplexity-User|ClaudeBot|Claude-SearchBot|Claude-User|anthropic-ai|CCBot|Amazonbot|cohere-ai|YouBot/i;

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  htmlLimitedBots: HTML_LIMITED_BOTS,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "**.r2.dev" },
    ],
  },
  async rewrites() {
    return [
      // IndexNow: /<chave>.txt → verificação dinâmica com a chave do CMS (arquivos reais vêm antes)
      { source: "/:key([a-zA-Z0-9-]{8,128})\\.txt", destination: "/api/outbox/indexnow/:key" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
