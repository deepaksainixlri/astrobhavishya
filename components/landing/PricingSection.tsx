'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

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
      { text: 'Priority Support', included: false },
    ],
    cta: 'Get Started Free',
    featured: false,
  },
  {
    name: 'Pro Monthly',
    price: '₹149',
    period: '/month',
    description: 'Continuous cosmic guidance',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Detailed Kundli Analysis', included: true },
      { text: 'Compatibility Matching', included: true },
      { text: 'Daily Personalized Horoscope', included: true },
      { text: 'Career & Finance Guidance', included: true },
      { text: 'Remedies & Gemstones', included: true },
      { text: 'Priority Support', included: true },
    ],
    cta: 'Start Pro Monthly',
    featured: true,
  },
  {
    name: 'Pro Annual',
    price: '₹999',
    period: '/year',
    description: 'Best value — save over 44%',
    features: [
      { text: 'Everything in Pro Monthly', included: true },
      { text: 'Unlimited Kundli Reports', included: true },
      { text: 'Family Charts (up to 5)', included: true },
      { text: 'Quarterly Deep Analysis', included: true },
      { text: '1-on-1 Consultation', included: true },
      { text: 'Exclusive Events Access', included: true },
      { text: 'Priority Support', included: true },
    ],
    cta: 'Start Pro Annual',
    featured: false,
    badge: 'Best Value',
  },
];

const faqs = [
  {
    question: 'Is the free version accurate?',
    answer:
      'Yes, our free Zodiac report uses the same AI algorithms as paid versions, but with basic analysis. Premium reports include deeper insights.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Monthly and annual subscriptions can be cancelled anytime with no penalties. One-time purchases are non-refundable after 7 days.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, UPI, net banking, and digital wallets. Your payment is 100% secure with SSL encryption.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'One-time purchases: 7-day money-back guarantee. Subscriptions: Refund available if cancelled within 7 days of billing.',
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section
      id="pricing"
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#FFFFF7' }}
    >
      {/* Subtle warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-transparent to-amber-50/40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Affordable cosmic wisdom. Start free, upgrade when you&apos;re ready.
          </p>
        </div>

        {/* Comparison Note */}
        <div className="text-center mb-14">
          <p className="text-gray-500 text-sm inline-flex items-center gap-4 flex-wrap justify-center">
            <span className="line-through text-gray-400">
              Traditional Astrologer: ₹500-1500
            </span>
            <span className="font-semibold text-amber-600">
              AstroBhavishya: Starting ₹0
            </span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-center">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-depth hover:shadow-depth-lg transition-all duration-500 p-8 flex flex-col h-full ${
                tier.featured
                  ? 'md:scale-105 md:z-10 border-2 border-amber-400'
                  : 'border border-gray-100'
              }`}
            >
              {/* Featured Badge */}
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-1.5 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Best Value Badge */}
              {tier.badge && !tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-1.5 rounded-full shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Plan Name & Description */}
              <h3 className="text-2xl font-bold text-gray-900 mb-1 mt-2">
                {tier.name}
              </h3>
              <p className="text-gray-500 text-sm mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  {tier.price}
                </span>
                <span className="text-gray-400 text-sm ml-1">
                  {tier.period}
                </span>
              </div>

              {/* CTA Button */}
              <Link
                href="/auth/register"
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 mb-8 ${
                  tier.featured
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md hover:shadow-lg hover:brightness-110'
                    : 'border-2 border-gray-200 text-gray-700 hover:border-amber-400 hover:text-amber-600'
                }`}
              >
                {tier.cta}
              </Link>

              {/* Features */}
              <div className="space-y-3 flex-1">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-depth p-10 md:p-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h4 className="text-gray-900 font-semibold mb-2">
                  {faq.question}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
