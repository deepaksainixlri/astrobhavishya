'use client';

import { PRICING_TIERS } from '@/lib/constants';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const oneTimePricing = PRICING_TIERS.filter(t => t.type === 'one-time');
  const subscriptionPricing = PRICING_TIERS.filter(t => t.type !== 'one-time');

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-warm-ivory to-warm-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gradient mb-4">
            Premium Pricing
          </h1>
          <p className="text-lg text-body-brown max-w-2xl mx-auto">
            Choose the perfect plan to unlock your cosmic destiny with affordable astrological guidance.
          </p>
        </div>

        {/* One-Time Reports */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-saffron mb-8 text-center">
            One-Time Reports
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oneTimePricing.map((tier) => (
              <div
                key={tier.id}
                className={`relative ${
                  tier.popular
                    ? 'md:col-span-2 lg:col-span-1 card-gold ring-2 ring-saffron'
                    : 'card'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-saffron-light to-saffron-bright px-4 py-1 rounded-full text-xs font-bold text-dark-brown whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-serif font-bold text-saffron mb-2">
                  {tier.name}
                </h3>
                <p className="text-body-brown text-sm mb-4">{tier.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-saffron">₹{tier.price}</span>
                    <span className="text-body-brown">one-time</span>
                  </div>
                  {tier.validityDays && (
                    <p className="text-sm text-body-brown mt-1">
                      Valid for {tier.validityDays} days
                    </p>
                  )}
                </div>

                <button className={`w-full mb-6 ${tier.popular ? 'btn-primary' : 'btn-outline'}`}>
                  Get {tier.name}
                </button>

                <div className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-saffron flex-shrink-0 mt-0.5" />
                      <span className="text-dark-brown text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-saffron mb-8 text-center">
            Subscription Plans
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {subscriptionPricing.map((tier) => (
              <div
                key={tier.id}
                className={`relative ${
                  tier.popular
                    ? 'card-gold ring-2 ring-saffron'
                    : 'card'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-saffron-light to-saffron-bright px-4 py-1 rounded-full text-xs font-bold text-dark-brown whitespace-nowrap">
                    Best Value
                  </div>
                )}

                <h3 className="text-2xl font-serif font-bold text-saffron mb-2">
                  {tier.name}
                </h3>
                <p className="text-body-brown text-sm mb-4">{tier.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-saffron">₹{tier.price}</span>
                    <span className="text-body-brown">
                      /{tier.type === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </div>

                <button className={`w-full mb-6 ${tier.popular ? 'btn-primary' : 'btn-outline'}`}>
                  Subscribe Now
                </button>

                <div className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-saffron flex-shrink-0 mt-0.5" />
                      <span className="text-dark-brown text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ / Comparison */}
        <div className="card">
          <h3 className="text-2xl font-serif font-bold text-saffron mb-6">
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
              <div key={idx} className="flex items-center justify-between p-4 bg-light-peach/30 rounded-lg border border-saffron/20">
                <span className="text-dark-brown">{item.feature}</span>
                <div className="flex gap-4">
                  {[item.free, item.detailed, item.premium, item.subscription].map((included, i) => (
                    <div key={i} className="w-8 h-8 flex items-center justify-center">
                      {included ? (
                        <Check className="w-5 h-5 text-saffron" />
                      ) : (
                        <X className="w-5 h-5 text-body-brown/30" />
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
          <h3 className="text-2xl font-serif font-bold text-saffron mb-4">
            Ready to Discover Your Destiny?
          </h3>
          <p className="text-body-brown mb-8">
            Join thousands of seekers exploring their cosmic blueprint
          </p>
          <Link href="/auth/register" className="btn-primary">
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}
