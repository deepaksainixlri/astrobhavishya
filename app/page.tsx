import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'AstroBhavishya - AI-Powered Vedic Astrology',
  description: 'Unlock your cosmic blueprint with AI-powered Vedic Astrology. Get instant, accurate Kundli reports in just 30 seconds.',
  keywords: 'astrology, kundli, horoscope, vedic astrology, compatibility, AI astrology',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-warm-ivory via-white to-warm-cream">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
