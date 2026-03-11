'use client';

import React from 'react';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: ['Kundli', 'Horoscope', 'Compatibility', 'Remedies'],
    Company: ['About Us', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Refund Policy'],
    Resources: ['FAQ', 'Guides', 'Documentation', 'Community'],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent mb-4">
              AstroBhavishya
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Unlock your cosmic blueprint with AI-powered Vedic Astrology. Instant, accurate, affordable insights.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 rounded-lg bg-white/5 hover:bg-amber-500/20 text-amber-400 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/20"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-t border-white/10 pt-8">
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white text-sm font-medium">support@astrobhavishya.com</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-white text-sm font-medium">+91 (800) 123-4567</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-400 text-sm">Address</p>
              <p className="text-white text-sm font-medium">Bangalore, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} AstroBhavishya. All rights reserved.</p>
            <p className="text-xs">
              <span className="text-amber-400">Disclaimer:</span> For entertainment purposes only. Not a substitute for professional astrological consultation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
