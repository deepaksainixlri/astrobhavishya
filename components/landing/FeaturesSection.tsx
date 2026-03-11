'use client';

import React from 'react';
import { Zap, Crosshair, Heart, Sun, Briefcase, Gem } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant AI Kundli',
    description:
      'Generate a complete Kundli analysis in just 30 seconds using advanced AI algorithms.',
    gradient: 'from-amber-400 to-orange-500',
    iconBg: 'bg-gradient-to-br from-amber-100 to-orange-100',
    iconColor: 'text-amber-600',
    accent: 'from-amber-400 to-orange-400',
  },
  {
    icon: Crosshair,
    title: 'Vimshottari Dasha',
    description:
      'Understand your planetary periods and life phases with precision timing.',
    gradient: 'from-violet-400 to-indigo-500',
    iconBg: 'bg-gradient-to-br from-violet-100 to-indigo-100',
    iconColor: 'text-violet-600',
    accent: 'from-violet-400 to-indigo-400',
  },
  {
    icon: Heart,
    title: 'Compatibility Matching',
    description:
      'Discover astrological harmony between birth charts. Perfect for relationships.',
    gradient: 'from-pink-400 to-rose-500',
    iconBg: 'bg-gradient-to-br from-pink-100 to-rose-100',
    iconColor: 'text-pink-600',
    accent: 'from-pink-400 to-rose-400',
  },
  {
    icon: Sun,
    title: 'Daily Horoscope',
    description:
      'Personalized daily insights tailored to your zodiac sign and birth chart.',
    gradient: 'from-yellow-400 to-amber-500',
    iconBg: 'bg-gradient-to-br from-yellow-100 to-amber-100',
    iconColor: 'text-yellow-600',
    accent: 'from-yellow-400 to-amber-400',
  },
  {
    icon: Briefcase,
    title: 'Career & Finance',
    description:
      'AI predictions for career growth, business success, and financial prosperity.',
    gradient: 'from-emerald-400 to-green-500',
    iconBg: 'bg-gradient-to-br from-emerald-100 to-green-100',
    iconColor: 'text-emerald-600',
    accent: 'from-emerald-400 to-green-400',
  },
  {
    icon: Gem,
    title: 'Remedies & Stones',
    description:
      'Personalized gemstone and remedy recommendations for planetary balance.',
    gradient: 'from-cyan-400 to-blue-500',
    iconBg: 'bg-gradient-to-br from-cyan-100 to-blue-100',
    iconColor: 'text-cyan-600',
    accent: 'from-cyan-400 to-blue-400',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden bg-[#FEFCF7]">
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600 mb-4">
            Everything You Need
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-violet-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to navigate your cosmic destiny with precision
            and insight.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-depth card-3d border border-gray-100/80 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient accent top border */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${feature.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.iconBg} transition-transform duration-500 group-hover:scale-110`}
                  >
                    <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 -z-10 blur-sm`}
                />
              </div>
            );
          })}
        </div>

        {/* Additional Info Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vedic Astrology Meets AI */}
          <div className="relative bg-white rounded-2xl p-10 shadow-depth card-3d border border-gray-100/80 overflow-hidden">
            {/* Decorative gradient corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-50 to-transparent rounded-bl-full" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-violet-100 mb-6">
                <span className="text-xl">✦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vedic Astrology Meets AI
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our algorithms combine thousands of years of Vedic knowledge
                with cutting-edge machine learning to provide insights once only
                available from master astrologers.
              </p>
              <ul className="space-y-3">
                {[
                  'Traditional Vedic principles',
                  'Modern AI analysis',
                  'Scientifically validated',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-violet-400 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trusted by Thousands */}
          <div className="relative bg-white rounded-2xl p-10 shadow-depth card-3d border border-gray-100/80 overflow-hidden">
            {/* Decorative gradient corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-50 to-transparent rounded-bl-full" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-amber-100 mb-6">
                <span className="text-xl">★</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Trusted by Thousands
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join over 500,000 users who have transformed their lives with
                AstroBhavishya&apos;s astrological insights and guidance.
              </p>
              <div className="space-y-4">
                {[
                  { label: '5-Star Reviews', value: '4.8/5' },
                  { label: 'Reports Generated', value: '2.5M+' },
                  { label: 'User Satisfaction', value: '97%' },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{stat.label}</span>
                    <span className="text-sm font-bold bg-gradient-to-r from-amber-500 to-violet-600 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
