'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Horoscope', href: '#horoscope' },
    { label: 'Kundli', href: '#kundli' },
    { label: 'Compatibility', href: '#compatibility' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-warm-ivory/80 border-b border-saffron/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 cursor-pointer group">
            <Image src="/logo-icon.svg" alt="AstroBhavishya" width={36} height={36} className="group-hover:rotate-12 transition-transform duration-500" />
            <span className="text-xl font-bold">
              <span className="text-dark-brown">Astro</span>
              <span className="bg-gradient-to-r from-saffron to-saffron-light bg-clip-text text-transparent">Bhavishya</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-body-brown hover:text-saffron transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-saffron/10 transition-colors duration-200"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-saffron" />
            ) : (
              <Menu className="w-6 h-6 text-saffron" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-saffron/15 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-3 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-body-brown hover:text-saffron transition-colors duration-200 text-sm font-medium px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 px-4 pt-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  Sign In
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
