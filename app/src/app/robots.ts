import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drhowardmurad.com'

// Bots that disrespect robots.txt or are high-bandwidth AI scrapers
const BLOCKED_BOTS = [
  // AI training scrapers
  'deepseekbot',
  'mycentralaiscraperbot',
  'img2dataset',
  'imagesiftbot',
  'cotoyogi',
  // ByteDance / TikTok (known robots.txt ignorer)
  'bytespider',
  // Aggressive general scrapers
  'scrapy',
  'blexbot',
  'kangaroo-bot',
  'taragroup-intelligent-bot',
  'crawler4j',
  'netestate-imprint-crawler',
  'news-please',
  'omgili',
  'omgilibot',
  // Additional known aggressive AI scrapers (recommended additions)
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'anthropic-ai',
  'ClaudeBot',
  'Google-Extended',
  'FacebookBot',
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  '360Spider',
  'Sogou',
  'PetalBot',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allowed crawlers (good bots)
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider'],
        allow: ['/'],
        disallow: ['/api/', '/preview/', '/wp-admin/', '/graphql'],
      },
      // All other bots — default allow with path restrictions
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/preview/', '/wp-admin/', '/graphql'],
        crawlDelay: 10,
      },
      // Blocked bots — disallow everything
      ...BLOCKED_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: ['/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
