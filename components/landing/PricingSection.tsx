'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const pricingTiers = [
  {
    name: 'Free',
    price: '₹0',
    period: 'Forever',
    description: 'Perfect for exploring astrology',
    features: [
      { text: 'Basic Zodiac Sign Report', included: true },
      { text: 'Daily Horoscope', included: true },
      { text: 'Planetary Positions', included: true },
      { text: 'Detailed Kundli', included: false },
      { text: 'Compatibility Matching', included: false },
      { text: 'Career Guidance', included: false },
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Detailed Kundli',
    price: '₹49-99',
    period: 'One-time',
    description: 'Deep astrological insights',
    features: [
      { text: 'Complete Kundli Analysis', included: true },
      { text: 'Vimshottari Dasha Period', included: true },
      { text: 'Nakshatras & Yogas', included: true },
      { text: 'Auspicious Timings', included: true },
      { text: 'Health Insights', included: true },
      { text: 'Remedies & Gemstones', included: true },
    ],
    cta: 'Buy Now',
    featured: false,
  },
  {
    name: 'Compatibility',
    price: '₹79-149',
    period: 'One-time',
    description: 'Relationship harmony analysis',
    features: [
      { text: 'Dual Chart Comparison', included: true },
      { text: 'Synastry Analysis', included: true },
      { text: 'Compatibility Score', included: true },
      { text: 'Future Predictions', included: true },
      { text: 'Relationship Advice', included: true },
      { text: 'Problem Resolution Guide', included: true },
    ],
    cta: 'Get Analysis',
    featured: false,
  },
  {
    name: 'Monthly Pro',
    price: '₹149-199',
    period: '/month',
    description: 'Continuous cosmic guidance',
    features: [
      { text: 'All One-time Features', included: true },
      { text: 'Daily Personalized Horoscope', included: true },
      { text: 'Weekly Predictions', included: true },
      { text: 'Monthly Guidance Report', included: true },
      { text: 'Priority Support', included: true },
      { text: 'AI Career Counseling', included: true },
    ],
    cta: 'Subscribe Now',
    featured: true,
  },
  {
    name: 'Annual Pro',
    price: '₹999-1499',
    period: '/year',
    description: 'Best value annual plan',
    features: [
      { text: 'All Monthly Features', included: true },
      { text: 'Unlimited Kundli Reports', included: true },
      { text: 'Family Charts (3 people)', included: true },
      { text: 'Quarterly Deep Analysis', included: true },
      { text: '1-on-1 Consultation', included: true },
      { text: 'Exclusive Events Access', included: true },
    ],
    cta: 'Subscribe Now',
    featured: false,
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Affordable cosmic wisdom. Start free, upgrade when you're ready.
          </p>
        </div>

        {/* Comparison Note */}
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm">
            <span className="line-through text-gray-500">Traditional Astrologer: ₹500-1500</span>
            <span className="text-amber-400 font-semibold ml-4">AstroBhavishya: Starting ₹0</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              variant={tier.featured ? 'gradient' : 'dark'}
              className={`p-8 flex flex-col h-full transition-all duration-300 ${
                tier.featured ? 'lg:scale-105 lg:z-10' : ''
              } animate-in fade-in slide-in-from-bottom-4 duration-500`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {tier.featured && (
                <Badge variant="tier" className="mb-4 w-full justify-center">
                  Most Popular
                </Badge>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-400">{tier.price}</span>
                <span className="text-gray-400 text-sm ml-2">{tier.period}</span>
              </div>

              <Button
                variant={tier.featured ? 'primary' : 'outline'}
                size="md"
                className="w-full mb-8"
              >
                {tier.cta}
              </Button>

              <div className="space-y-3 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card variant="glass" className="p-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-2">Is the free version accurate?</h4>
              <p className="text-gray-400 text-sm">
                Yes, our free Zodiac report uses the same AI algorithms as paid versions, but with basic analysis. Premium reports include deeper insights.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-400 text-sm">
                Monthly and annual subscriptions can be cancelled anytime with no penalties. One-time purchases are non-refundable after 7 days.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-400 text-sm">
                We accept all major credit cards, UPI, net banking, and digital wallets. Your payment is 100% secure with SSL encryption.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-gray-400 text-sm">
                One-time purchases: 7-day money-back guarantee. Subscriptions: Refund available if cancelled within 7 days of billing.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
