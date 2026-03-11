'use client';

import React from 'react';
import { Zap, Crosshair, Heart, Sun, Briefcase, Gem } from 'lucide-react';
import { Card } from '../ui/Card';

const features = [
  {
    icon: Zap,
    title: 'Instant AI Kundli',
    description: 'Generate complete Kundli analysis in just 30 seconds using advanced AI algorithms.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Crosshair,
    title: 'Vimshottari Dasha',
    description: 'Understand your planetary periods and life phases with precision timing.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Heart,
    title: 'Compatibility Matching',
    description: 'Discover astrological harmony between birth charts. Perfect for relationships.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Sun,
    title: 'Daily Horoscope',
    description: 'Personalized daily insights tailored to your zodiac sign and birth chart.',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    icon: Briefcase,
    title: 'Career & Finance',
    description: 'AI predictions for career growth, business success, and financial prosperity.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Gem,
    title: 'Remedies & Stones',
    description: 'Get personalized gemstone and remedy recommendations for planetary balance.',
    color: 'from-cyan-500 to-blue-500',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-warm-cream to-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-saffron/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-saffron to-terracotta-light bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-body-brown text-lg max-w-2xl mx-auto">
            Everything you need to navigate your cosmic destiny with precision and insight.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                variant="gradient"
                className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} shadow-warm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-dark-brown mb-3">
                  {feature.title}
                </h3>
                <p className="text-body-brown leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:mt-20">
          <Card variant="glass" className="p-8">
            <h3 className="text-2xl font-bold text-dark-brown mb-4">
              Vedic Astrology Meets AI
            </h3>
            <p className="text-body-brown mb-4">
              Our algorithms combine thousands of years of Vedic knowledge with cutting-edge machine learning to provide insights that were once only available from master astrologers.
            </p>
            <ul className="space-y-2 text-body-brown text-sm">
              <li>✓ Traditional Vedic principles</li>
              <li>✓ Modern AI analysis</li>
              <li>✓ Scientifically validated</li>
            </ul>
          </Card>
          <Card variant="glass" className="p-8">
            <h3 className="text-2xl font-bold text-dark-brown mb-4">
              Trusted by Thousands
            </h3>
            <p className="text-body-brown mb-4">
              Join over 500,000 users who have transformed their lives with AstroBhavishya insights.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-body-brown">5-Star Reviews</span>
                <span className="text-saffron font-bold">4.8/5</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-body-brown">Reports Generated</span>
                <span className="text-saffron font-bold">2.5M+</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-body-brown">User Satisfaction</span>
                <span className="text-saffron font-bold">97%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
