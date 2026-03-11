import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AstroBhavishya - AI Vedic Astrology Platform',
  description: 'Discover your cosmic destiny with AI-powered Vedic astrology. Get personalized birth charts, compatibility reports, and daily horoscopes.',
  keywords: 'vedic astrology, birth chart, horoscope, compatibility, kundli, astrology app',
  authors: [{ name: 'AstroBhavishya Team' }],
  creator: 'AstroBhavishya',
  publisher: 'AstroBhavishya',
  formatDetection: {
    email: true,
    telephone: true,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://astro-bhavishya.com',
    siteName: 'AstroBhavishya',
    title: 'AstroBhavishya - AI Vedic Astrology Platform',
    description: 'Discover your cosmic destiny with AI-powered Vedic astrology',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AstroBhavishya Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AstroBhavishya',
    creator: '@AstroBhavishya',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFDF5' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#FFFDF5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AstroBhavishya" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-warm-ivory text-dark-brown">
        <div className="min-h-screen flex flex-col">
          {/* Main Content */}
          <main className="flex-1 relative z-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
