import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/lib/context/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'AstroBhavishya - AI Vedic Astrology Platform',
  description: 'Discover your cosmic destiny with AI-powered Vedic astrology. Get personalized birth charts, compatibility reports, and daily horoscopes.',
  keywords: 'vedic astrology, birth chart, horoscope, compatibility, kundli, astrology app',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://astro-bhavishya.com',
    siteName: 'AstroBhavishya',
    title: 'AstroBhavishya - AI Vedic Astrology Platform',
    description: 'Discover your cosmic destiny with AI-powered Vedic astrology',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#C8942D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
