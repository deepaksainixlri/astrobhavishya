'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Kundli', href: '/kundli' },
      { label: 'Horoscope', href: '/horoscope' },
      { label: 'Compatibility', href: '/compatibility' },
      { label: 'Remedies', href: '/remedies' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Refund Policy', href: '/refund' },
    ],
    Resources: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Guides', href: '/guides' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Community', href: '/community' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
                AstroBhavishya
              </h3>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Unlock your cosmic blueprint with AI-powered Vedic Astrology. Instant, accurate, affordable insights.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-amber-600 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-t border-gray-200 pt-8">
          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-amber-50">
              <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Email</p>
              <a
                href="mailto:support@astrobhavishya.com"
                className="text-gray-700 text-sm font-medium hover:text-amber-600 transition-colors duration-200"
              >
                support@astrobhavishya.com
              </a>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-amber-50">
              <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Phone</p>
              <a
                href="tel:+918001234567"
                className="text-gray-700 text-sm font-medium hover:text-amber-600 transition-colors duration-200"
              >
                +91 (800) 123-4567
              </a>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-amber-50">
              <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Address</p>
              <p className="text-gray-700 text-sm font-medium">Bangalore, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-500">
              &copy; {currentYear} AstroBhavishya. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              <span className="text-amber-600 font-medium">Disclaimer:</span>{' '}
              For entertainment purposes only. Not a substitute for professional astrological consultation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
