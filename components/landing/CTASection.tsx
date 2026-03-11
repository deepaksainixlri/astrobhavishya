'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Sparkles, Shield, Zap, Infinity } from 'lucide-react';

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
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-amber-50/40 to-orange-50/50">
      {/* Subtle background shapes */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card */}
        <div
          className="relative rounded-3xl p-12 lg:p-16
            bg-white/70 backdrop-blur-md border border-white/80
            shadow-[0_8px_48px_rgba(0,0,0,0.07)]"
        >
          {/* Gradient border glow */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-amber-200/40 via-transparent to-orange-200/40 pointer-events-none" />

          <div className="relative">
            {/* Badge */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-amber-600">
                  Limited Time Offer
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Start Your Cosmic Journey
                </span>
              </h2>
              <p className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
                Get Your Free Kundli Today
              </p>

              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                No credit card required. Get instant access to your complete birth chart
                analysis and personalized insights.
              </p>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-gray-200
                      text-gray-900 placeholder:text-gray-400
                      focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400
                      shadow-sm transition-all duration-200"
                  />
                </div>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
                    bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold
                    shadow-[0_4px_14px_rgba(245,158,11,0.35)]
                    hover:shadow-[0_6px_24px_rgba(245,158,11,0.45)] hover:-translate-y-0.5
                    transition-all duration-300 active:scale-[0.97] whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Free Report
                </Link>
              </div>
            </form>

            {/* Confirmation Message */}
            {submitted && (
              <div className="text-center mb-4 animate-in fade-in duration-300">
                <p className="text-emerald-600 font-semibold text-sm">
                  Check your email! Your Kundli report is on the way.
                </p>
              </div>
            )}

            {/* Trust Text */}
            <p className="text-center text-gray-500 text-sm">
              We respect your privacy. Your data is encrypted and never shared.
            </p>

            {/* Feature Highlights */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200/60">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 mb-2">
                  <Infinity className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium">Unlimited Access</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 mb-2">
                  <Shield className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium">100% Secure</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 mb-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium">Instant Results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Not ready yet?{' '}
            <a
              href="#"
              className="text-amber-600 hover:text-amber-500 font-medium transition-colors"
            >
              Learn more about Vedic astrology
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
