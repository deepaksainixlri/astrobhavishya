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
  themeColor: '#0f0b1e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-gray-950 text-gray-100 antialiased">
        <AuthProvider>
          <div className="min-h-screen flex flex-col relative">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950" />
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-5" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-5" />
            </div>
            <main className="flex-1 relative z-0">{children}</main>
            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-800 bg-gray-950/80 backdrop-blur">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-amber-400 mb-4">AstroBhavishya</h3>
                    <p className="text-gray-400 text-sm">AI-powered Vedic astrology for modern seekers of cosmic wisdom.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200 mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li><a href="/" className="hover:text-amber-400 transition">Home</a></li>
                      <li><a href="/dashboard" className="hover:text-amber-400 transition">Dashboard</a></li>
                      <li><a href="/pricing" className="hover:text-amber-400 transition">Pricing</a></li>
                      <li><a href="/horoscope" className="hover:text-amber-400 transition">Horoscope</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200 mb-4">Services</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li><a href="/dashboard" className="hover:text-amber-400 transition">Birth Chart</a></li>
                      <li><a href="/compatibility" className="hover:text-amber-400 transition">Compatibility</a></li>
                      <li><a href="/horoscope" className="hover:text-amber-400 transition">Daily Horoscope</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200 mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="text-xs text-gray-500 mt-4">For entertainment and spiritual guidance purposes only.</li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center">
                  <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} AstroBhavishya. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
