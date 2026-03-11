'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Star } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, signOut } = useAuth();

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
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-gray-950/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <Star className="w-8 h-8 text-amber-400 fill-amber-400 group-hover:rotate-180 transition-transform duration-500" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              AstroBhavishya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="font-semibold rounded-lg transition-all duration-300 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="font-semibold rounded-lg transition-all duration-300 px-3 py-1.5 text-sm border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="font-semibold rounded-lg transition-all duration-300 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="font-semibold rounded-lg transition-all duration-300 px-3 py-1.5 text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 hover:shadow-lg hover:shadow-amber-500/50 hover:scale-105 active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-amber-400" />
            ) : (
              <Menu className="w-6 h-6 text-amber-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-3 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm font-medium px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 px-4 pt-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex-1 text-center font-semibold rounded-lg px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { handleSignOut(); setIsOpen(false); }}
                      className="flex-1 font-semibold rounded-lg px-3 py-1.5 text-sm border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="flex-1 text-center font-semibold rounded-lg px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex-1 text-center font-semibold rounded-lg px-3 py-1.5 text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 hover:shadow-lg hover:shadow-amber-500/50"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
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
