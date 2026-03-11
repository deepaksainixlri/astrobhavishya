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

          {/* Footer */}
          <footer className="relative z-10 border-t border-saffron border-opacity-20 bg-warm-cream/60 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-serif font-bold text-saffron mb-4">AstroBhavishya</h3>
                  <p className="text-body-brown text-sm">
                    AI-powered Vedic astrology for modern seekers of cosmic wisdom.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dark-brown mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-body-brown">
                    <li><a href="/" className="hover:text-saffron transition">Home</a></li>
                    <li><a href="/dashboard" className="hover:text-saffron transition">Dashboard</a></li>
                    <li><a href="/pricing" className="hover:text-saffron transition">Pricing</a></li>
                    <li><a href="/horoscope" className="hover:text-saffron transition">Horoscope</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dark-brown mb-4">Services</h4>
                  <ul className="space-y-2 text-sm text-body-brown">
                    <li><a href="/dashboard" className="hover:text-saffron transition">Birth Chart</a></li>
                    <li><a href="/compatibility" className="hover:text-saffron transition">Compatibility</a></li>
                    <li><a href="/horoscope" className="hover:text-saffron transition">Daily Horoscope</a></li>
                    <li><a href="/pricing" className="hover:text-saffron transition">Premium Reports</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-dark-brown mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-body-brown">
                    <li><a href="/privacy" className="hover:text-saffron transition">Privacy Policy</a></li>
                    <li><a href="/terms" className="hover:text-saffron transition">Terms of Service</a></li>
                    <li><a href="/contact" className="hover:text-saffron transition">Contact Us</a></li>
                    <li><a href="/faq" className="hover:text-saffron transition">FAQ</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-saffron border-opacity-20 pt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-body-brown text-sm">
                    © {new Date().getFullYear()} AstroBhavishya. All rights reserved.
                  </p>
                  <div className="flex gap-6 mt-4 sm:mt-0">
                    <a href="#" className="text-body-brown hover:text-saffron transition text-sm">Twitter</a>
                    <a href="#" className="text-body-brown hover:text-saffron transition text-sm">Facebook</a>
                    <a href="#" className="text-body-brown hover:text-saffron transition text-sm">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
