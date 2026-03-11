'use client';

import { PRICING_TIERS } from '@/lib/constants';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const oneTimePricing = PRICING_TIERS.filter(t => t.type === 'one-time');
  const subscriptionPricing = PRICING_TIERS.filter(t => t.type !== 'one-time');

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gradient mb-4">
            Cosmic Pricing
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan to unlock your cosmic destiny with affordable astrological guidance.
          </p>
        </div>

        {/* One-Time Reports */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-astro-gold mb-8 text-center">
            One-Time Reports
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oneTimePricing.map((tier) => (
              <div
                key={tier.id}
                className={`relative ${
                  tier.popular
                    ? 'md:col-span-2 lg:col-span-1 card-gold ring-2 ring-astro-gold'
                    : 'card'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-astro-gold to-astro-purple px-4 py-1 rounded-full text-xs font-bold text-cosmic-dark whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-serif font-bold text-astro-gold mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{tier.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-astro-gold">₹{tier.price}</span>
                    <span className="text-gray-400">one-time</span>
                  </div>
                  {tier.validityDays && (
                    <p className="text-sm text-gray-400 mt-1">
                      Valid for {tier.validityDays} days
                    </p>
                  )}
                </div>

                <button className={`w-full mb-6 ${tier.popular ? 'btn-secondary' : 'btn-outline'}`}>
                  Get {tier.name}
                </button>

                <div className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-astro-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-astro-gold mb-8 text-center">
            Subscription Plans
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {subscriptionPricing.map((tier) => (
              <div
                key={tier.id}
                className={`relative ${
                  tier.popular
                    ? 'card-gold ring-2 ring-astro-gold'
                    : 'card'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-astro-gold to-astro-purple px-4 py-1 rounded-full text-xs font-bold text-cosmic-dark whitespace-nowrap">
                    Best Value
                  </div>
                )}

                <h3 className="text-2xl font-serif font-bold text-astro-gold mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{tier.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-astro-gold">₹{tier.price}</span>
                    <span className="text-gray-400">
                      /{tier.type === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </div>

                <button className={`w-full mb-6 ${tier.popular ? 'btn-secondary' : 'btn-outline'}`}>
                  Subscribe Now
                </button>

                <div className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-astro-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ / Comparison */}
        <div className="card">
          <h3 className="text-2xl font-serif font-bold text-astro-gold mb-6">
            What's Included?
          </h3>
          <div className="space-y-4">
            {[
              {
                feature: 'Birth Chart Generation',
                free: true,
                detailed: true,
                premium: true,
                subscription: true,
              },
              {
                feature: 'Detailed Analysis',
                free: false,
                detailed: true,
                premium: true,
                subscription: true,
              },
              {
                feature: 'Daily Horoscope',
                free: true,
                detailed: false,
                premium: false,
                subscription: true,
              },
              {
                feature: 'Expert Consultation',
                free: false,
                detailed: false,
                premium: true,
                subscription: true,
              },
              {
                feature: 'Remedial Solutions',
                free: false,
                detailed: false,
                premium: true,
                subscription: true,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-cosmic-darker/30 rounded-lg border border-astro-gold/20">
                <span className="text-gray-300">{item.feature}</span>
                <div className="flex gap-4">
                  {[item.free, item.detailed, item.premium, item.subscription].map((included, i) => (
                    <div key={i} className="w-8 h-8 flex items-center justify-center">
                      {included ? (
                        <Check className="w-5 h-5 text-astro-gold" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-serif font-bold text-astro-gold mb-4">
            Ready to Discover Your Destiny?
          </h3>
          <p className="text-gray-400 mb-8">
            Join thousands of seekers exploring their cosmic blueprint
          </p>
          <Link href="/auth/register" className="btn-secondary">
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}
