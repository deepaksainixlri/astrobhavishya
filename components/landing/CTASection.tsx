'use client';

import React, { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const CTASection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card variant="gradient" className="p-12 lg:p-16">
          {/* Content */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">Limited Time Offer</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Start Your Cosmic Journey
              </span>
              <br />
              <span className="text-2xl md:text-3xl text-gray-300 mt-4 block font-normal">
                Get Your Free Kundli Today
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              No credit card required. Get instant access to your complete birth chart analysis and personalized insights.
            </p>
          </div>

          {/* Email Signup */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-5 h-5" />}
                className="flex-1"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="sm:w-auto"
              >
                Get Free Report
              </Button>
            </div>
          </form>

          {/* Confirmation Message */}
          {submitted && (
            <div className="mt-6 text-center animate-in fade-in duration-300">
              <p className="text-green-400 font-semibold">
                ✓ Check your email! Your Kundli report is on the way.
              </p>
            </div>
          )}

          {/* Trust Text */}
          <p className="text-center text-gray-400 text-sm mt-8">
            We respect your privacy. Your data is encrypted and never shared.
          </p>

          {/* Feature Highlights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">∞</div>
              <p className="text-gray-400 text-sm">Unlimited Access</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">🔒</div>
              <p className="text-gray-400 text-sm">100% Secure</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">⚡</div>
              <p className="text-gray-400 text-sm">Instant Results</p>
            </div>
          </div>
        </Card>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            Not ready yet? <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
              Learn more about Vedic astrology
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
