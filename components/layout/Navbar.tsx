'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Star } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Horoscope', href: '/horoscope' },
    { label: 'Kundli', href: '/dashboard/birth-chart' },
    { label: 'Compatibility', href: '/compatibility' },
    { label: 'Pricing', href: '/pricing' },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-depth border-b border-gray-100'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Star className="w-8 h-8 text-amber-500 fill-amber-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xl font-serif font-bold text-gradient-gold">
              AstroBhavishya
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-gray-600 hover:text-amber-600 transition-colors duration-200 text-sm font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className="px-4 py-2 text-sm font-semibold border-2 border-amber-400 text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-amber-600 transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/register" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl shadow-gold hover:shadow-gold-lg hover:scale-105 active:scale-95 transition-all duration-300">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 bg-white/95 backdrop-blur-xl rounded-b-2xl shadow-depth-lg">
            <div className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-gray-600 hover:text-amber-600 hover:bg-amber-50 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 px-4 pt-3 border-t border-gray-100 mt-2">
                {user ? (
                  <>
                    <Link href="/dashboard" className="flex-1 text-center font-semibold rounded-lg px-3 py-2 text-sm text-amber-600 hover:bg-amber-50" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="flex-1 font-semibold rounded-lg px-3 py-2 text-sm border-2 border-amber-400 text-amber-600">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="flex-1 text-center font-semibold rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Sign In</Link>
                    <Link href="/auth/register" className="flex-1 text-center font-semibold rounded-lg px-3 py-2 text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-gold" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
