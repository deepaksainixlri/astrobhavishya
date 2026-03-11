'use client';

import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles for cosmic effect
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      vx: number;
      vy: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.globalAlpha = particle.opacity;
        ctx.fillRect(particle.x, particle.y, particle.radius, particle.radius);
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Cosmic Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <Badge variant="accent" className="inline-flex gap-2">
            <Sparkles className="w-4 h-4" />
            Welcome to the future of astrology
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <span className="block text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Unlock Your
            </span>
          </span>
          <span className="block text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
              Cosmic Blueprint
            </span>
          </span>
          <span className="text-2xl md:text-3xl text-gray-300">
            with AI-Powered Vedic Astrology
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Get instant, hyper-accurate Kundli reports in just 30 seconds. No guesswork, no waiting for astrologers—just pure cosmic intelligence at your fingertips.
        </p>

        {/* CTA Buttons */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="primary" size="lg" className="inline-flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Get Your Free Kundli
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg">
            Explore Features
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          <div className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <div className="text-2xl font-bold text-amber-400">99.5%</div>
            <p className="text-sm text-gray-400">Accuracy Rate</p>
          </div>
          <div className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <div className="text-2xl font-bold text-amber-400">30 Sec</div>
            <p className="text-sm text-gray-400">Instant Reports</p>
          </div>
          <div className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <div className="text-2xl font-bold text-amber-400">₹49</div>
            <p className="text-sm text-gray-400">Starting Price</p>
          </div>
        </div>

        {/* Zodiac Wheel Animation */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-4 rounded-full border border-amber-500/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          <div className="absolute inset-8 rounded-full border border-pink-500/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">♈</span>
          </div>
        </div>
      </div>
    </section>
  );
};
