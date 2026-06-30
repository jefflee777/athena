import './globals.css';
import Providers from './providers';

const SITE_URL = 'https://www.aiathena.wtf';
const OG_IMAGE = `${SITE_URL}/og.png`;

export const metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Core SEO ──────────────────────────────────────────────
  title: {
    default: 'Athena AI — Smart DEX Aggregator & Swap Optimizer on BNB Chain',
    template: '%s | Athena AI',
  },
  description:
    'Athena AI is the leading decentralized swap optimization protocol on BNB Chain. Aggregate liquidity across PancakeSwap, SushiSwap, BiSwap & more to get the best prices with minimal slippage. Powered by AI-driven routing.',
  keywords: [
    'Athena AI',
    'DEX aggregator',
    'BNB Chain swap',
    'swap optimizer',
    'PancakeSwap',
    'SushiSwap',
    'BiSwap',
    'decentralized exchange',
    'DeFi',
    'crypto swap',
    'AI trading',
    'liquidity aggregation',
    'BNB Chain DeFi',
    'best swap rates',
    'token swap',
    'smart routing',
  ],
  authors: [{ name: 'Athena AI', url: SITE_URL }],
  creator: 'Athena AI',
  publisher: 'Athena AI',
  category: 'Finance',

  // ── Favicons & Icons ──────────────────────────────────────
  icons: {
    icon: [
      { url: '/agent.png', sizes: '32x32', type: 'image/png' },
      { url: '/agent.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/agent.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/agent.png',
  },

  // ── Canonical & Alternates ────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Robots ────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Open Graph (absolute URLs required for crawlers) ──────
  openGraph: {
    title: 'Athena AI — Smart DEX Aggregator & Swap Optimizer on BNB Chain',
    description:
      'Aggregate liquidity from PancakeSwap, SushiSwap, BiSwap & more. AI-powered routing finds the best swap rates on BNB Chain with minimal slippage.',
    url: SITE_URL,
    siteName: 'Athena AI',
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Athena AI — Smart DEX Aggregator on BNB Chain',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // ── Twitter / X ───────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Athena AI — Smart DEX Aggregator & Swap Optimizer',
    description:
      'AI-powered swap routing across BNB Chain DEXs. Best prices, minimal slippage, maximum savings.',
    images: [OG_IMAGE],
    creator: '@athena_protocol',
    site: '@athena_protocol',
  },

  // ── Misc ──────────────────────────────────────────────────
  applicationName: 'Athena AI',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Athena AI',
      url: SITE_URL,
      description:
        'Athena AI is the leading decentralized swap optimization protocol on BNB Chain.',
      image: OG_IMAGE,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Athena AI',
      url: SITE_URL,
      logo: `${SITE_URL}/agent.png`,
      image: OG_IMAGE,
      description:
        'Decentralized swap optimization protocol powered by AI on BNB Chain.',
      sameAs: [
        'https://twitter.com/athena_protocol',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Athena AI',
      url: SITE_URL,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      description:
        'AI-driven DEX aggregator that finds the best swap routes across BNB Chain decentralized exchanges.',
      image: OG_IMAGE,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ];

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
