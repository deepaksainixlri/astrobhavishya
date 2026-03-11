'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

const zodiacSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ backgroundColor: '#FEFCF7' }}
    >
      {/* ── Soft radial background gradients ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-amber-200/30 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-200/20 blur-[100px]" />
        <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-orange-200/20 blur-[100px]" />
      </div>

      {/* ── Floating decorative orbs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large orb top-right */}
        <div
          className="absolute top-24 right-[12%] w-20 h-20 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3), 0 2px 8px rgba(245, 158, 11, 0.15)',
            animation: 'floatOrb 6s ease-in-out infinite',
          }}
        />
        {/* Medium orb left */}
        <div
          className="absolute top-[40%] left-[8%] w-14 h-14 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3), 0 2px 8px rgba(139, 92, 246, 0.15)',
            animation: 'floatOrb 8s ease-in-out infinite 1s',
          }}
        />
        {/* Small orb bottom-right */}
        <div
          className="absolute bottom-[25%] right-[10%] w-10 h-10 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #fcd34d, #f59e0b)',
            boxShadow: '0 6px 24px rgba(252, 211, 77, 0.35)',
            animation: 'floatOrb 7s ease-in-out infinite 2s',
          }}
        />
        {/* Tiny orb top-left */}
        <div
          className="absolute top-[15%] left-[20%] w-6 h-6 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #c4b5fd, #8b5cf6)',
            boxShadow: '0 4px 16px rgba(196, 181, 253, 0.4)',
            animation: 'floatOrb 5s ease-in-out infinite 0.5s',
          }}
        />
        {/* Extra orb center-left */}
        <div
          className="absolute bottom-[40%] left-[15%] w-8 h-8 rounded-full hidden md:block"
          style={{
            background: 'linear-gradient(135deg, #fde68a, #fbbf24)',
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)',
            animation: 'floatOrb 9s ease-in-out infinite 3s',
          }}
        />
      </div>

      {/* ── CSS 3D Zodiac Wheel ── */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] hidden lg:block pointer-events-none"
        style={{ perspective: '1200px' }}
        aria-hidden="true"
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(15deg) rotateY(-20deg)',
            animation: 'spinWheel 40s linear infinite',
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid rgba(245, 158, 11, 0.15)',
              boxShadow: '0 0 40px rgba(245, 158, 11, 0.05), inset 0 0 40px rgba(245, 158, 11, 0.03)',
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute inset-10 rounded-full"
            style={{
              border: '1.5px solid rgba(139, 92, 246, 0.12)',
              animation: 'spinWheel 30s linear infinite reverse',
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute inset-20 rounded-full"
            style={{
              border: '1px solid rgba(245, 158, 11, 0.1)',
              boxShadow: 'inset 0 0 20px rgba(245, 158, 11, 0.03)',
            }}
          />
          {/* Zodiac symbols placed around the wheel */}
          {zodiacSymbols.map((symbol, i) => {
            const angle = (i * 30) - 90;
            const radius = 210;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <span
                key={i}
                className="absolute text-2xl select-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  color: i % 2 === 0 ? 'rgba(245, 158, 11, 0.35)' : 'rgba(139, 92, 246, 0.3)',
                  textShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                {symbol}
              </span>
            );
          })}
          {/* Center glow */}
          <div
            className="absolute inset-[35%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>

      {/* ── Main Content ── */}
      <div
        className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Top Badge */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(139,92,246,0.08))',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              color: '#92400e',
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            AI-Powered Vedic Astrology Platform
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6">
          <span className="block text-5xl md:text-7xl font-extrabold tracking-tight mb-3">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
              }}
            >
              Unlock Your
            </span>
          </span>
          <span className="block text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #7c3aed, #6d28d9, #7c3aed)',
              }}
            >
              Cosmic Blueprint
            </span>
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed font-medium">
          Instant, hyper-accurate Kundli reports in just 30 seconds.
        </p>
        <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          No guesswork, no waiting for astrologers — just pure cosmic intelligence powered by advanced AI and ancient Vedic wisdom.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Link
            href="/auth/register"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              boxShadow: '0 4px 20px rgba(245, 158, 11, 0.35), 0 2px 8px rgba(245, 158, 11, 0.2)',
            }}
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Get Your Free Kundli
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-gray-700 bg-white"
            style={{
              border: '2px solid rgba(245, 158, 11, 0.25)',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            }}
          >
            View Pricing
          </Link>
        </div>

        {/* ── Glass-morphism Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto mb-14">
          {/* Stat: Accuracy */}
          <div
            className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.04] cursor-default"
            style={{
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div
              className="text-3xl font-bold mb-1 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            >
              99.5%
            </div>
            <p className="text-sm font-medium text-gray-600">Accuracy</p>
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.12)',
              }}
            />
          </div>

          {/* Stat: Reports Speed */}
          <div
            className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.04] cursor-default"
            style={{
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div
              className="text-3xl font-bold mb-1 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            >
              30 Sec
            </div>
            <p className="text-sm font-medium text-gray-600">Reports</p>
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.12)',
              }}
            />
          </div>

          {/* Stat: Starting Price */}
          <div
            className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.04] cursor-default"
            style={{
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div
              className="text-3xl font-bold mb-1 bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            >
              Starting &#8377;49
            </div>
            <p className="text-sm font-medium text-gray-600">Affordable Plans</p>
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.12)',
              }}
            />
          </div>
        </div>

        {/* ── Trust Badges ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {[
            { icon: '🔒', label: 'Bank-Grade Security' },
            { icon: '⚡', label: 'Instant Delivery' },
            { icon: '🧠', label: 'AI + Vedic Fusion' },
            { icon: '💎', label: 'Premium Quality' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-md"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
              }}
            >
              <span className="text-lg flex-shrink-0">{badge.icon}</span>
              <span className="text-xs font-medium text-gray-700 leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyframe Animations ── */}
      <style jsx>{`
        @keyframes floatOrb {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        @keyframes spinWheel {
          from {
            transform: rotateX(15deg) rotateY(-20deg) rotateZ(0deg);
          }
          to {
            transform: rotateX(15deg) rotateY(-20deg) rotateZ(360deg);
          }
        }
      `}</style>
    </section>
  );
};
