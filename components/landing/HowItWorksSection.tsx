'use client';

import React from 'react';
import { Calendar, Brain, FileText, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';

const steps = [
  {
    icon: Calendar,
    title: 'Enter Birth Details',
    description: 'Share your date, time, and place of birth. Our system validates and stores this securely.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Brain,
    title: 'AI Analyzes Your Chart',
    description: 'Our advanced AI engine processes your birth chart using Vedic astrology algorithms.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: FileText,
    title: 'Receive Detailed Report',
    description: 'Get a comprehensive, personalized astrology report in just 30 seconds, instantly delivered.',
    color: 'from-pink-500 to-rose-500',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get your cosmic insights in three simple steps. No waiting, no complexity.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/20 via-amber-500/30 to-pink-500/20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card
                    variant="gradient"
                    className="p-8 h-full animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-gray-900 font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${step.color} w-fit mb-6 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </Card>

                  {/* Arrow (Desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-8 top-1/3 justify-center">
                      <ArrowRight className="w-6 h-6 text-amber-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card variant="glass" className="p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to unlock your cosmic blueprint?
            </h3>
            <p className="text-gray-400 mb-8">
              Join thousands who've discovered their true potential through AstroBhavishya.
            </p>
            <button
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 font-semibold
              hover:shadow-lg hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 active:scale-95"
            >
              Get Your Free Kundli Now
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
};
