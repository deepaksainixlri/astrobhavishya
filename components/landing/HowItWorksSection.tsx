'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Brain, FileText, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Enter Birth Details',
    description:
      'Share your date, time, and place of birth. Our system validates and stores this securely.',
    accent: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Brain,
    title: 'AI Analyzes Your Chart',
    description:
      'Our advanced AI engine processes your birth chart using Vedic astrology algorithms.',
    accent: 'bg-orange-50 text-orange-600',
  },
  {
    icon: FileText,
    title: 'Receive Detailed Report',
    description:
      'Get a comprehensive, personalized astrology report in just 30 seconds, instantly delivered.',
    accent: 'bg-rose-50 text-rose-600',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-white">
      {/* Subtle decorative blobs */}
      <div className="absolute top-16 left-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-3">
            Simple Process
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Get your cosmic insights in three simple steps. No waiting, no complexity.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-32 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  <div
                    className="relative bg-white rounded-2xl p-8 h-full border border-gray-100
                      shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)]
                      transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* Step Number */}
                    <div
                      className="absolute -top-5 -left-3 w-12 h-12 rounded-full
                        bg-gradient-to-br from-amber-400 to-orange-500
                        flex items-center justify-center text-white font-bold text-lg
                        shadow-[0_4px_14px_rgba(245,158,11,0.4)] ring-4 ring-white"
                    >
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center p-4 rounded-xl ${step.accent} w-fit mb-6`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-[15px]">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between cards (Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-7 top-1/3 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-100">
                      <ArrowRight className="w-4 h-4 text-amber-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-20 text-center">
          <div
            className="relative max-w-2xl mx-auto rounded-2xl p-12
              bg-white/70 backdrop-blur-md border border-white/80
              shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
          >
            {/* Decorative glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-200/30 via-transparent to-orange-200/30 pointer-events-none" />

            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to unlock your cosmic blueprint?
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Join thousands who have discovered their true potential through AstroBhavishya.
              </p>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                  bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold
                  shadow-[0_4px_14px_rgba(245,158,11,0.35)]
                  hover:shadow-[0_6px_24px_rgba(245,158,11,0.45)] hover:-translate-y-0.5
                  transition-all duration-300 active:scale-[0.97]"
              >
                Get Your Free Kundli Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
