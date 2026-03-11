'use client';

import React, { useState } from 'react';
import { CompatibilityForm } from '@/components/forms/CompatibilityForm';
import { BirthDetails } from '@/lib/types';

export default function CompatibilityPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCompatibilityCheck = async (person1: BirthDetails, person2: BirthDetails) => {
    setLoading(true);
    try {
      const response = await fetch('/api/check-compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person1, person2 }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      }
    } catch (error) {
      console.error('Compatibility check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-ivory via-white to-warm-cream p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setResult(null)}
            className="mb-8 px-4 py-2 text-saffron hover:text-saffron-light transition-colors flex items-center gap-2"
          >
            ← Back
          </button>

          <div className="bg-gradient-to-br from-warm-cream to-light-peach rounded-2xl p-8 border border-saffron/20 shadow-warm">
            <h1 className="text-4xl font-bold text-saffron mb-8 text-center">
              Compatibility Report
            </h1>

            {/* Overall Score */}
            <div className="bg-white rounded-lg p-8 mb-8 text-center border border-saffron/20 shadow-warm">
              <p className="text-body-brown text-sm mb-3">Overall Compatibility</p>
              <div className="text-6xl font-bold text-saffron mb-4">
                {result.overallScore}%
              </div>
              <div className="flex gap-2 justify-center">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-6 rounded ${
                      i < result.overallScore / 10
                        ? 'bg-saffron'
                        : 'bg-saffron/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Scores Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 border border-saffron/20 shadow-warm">
                <p className="text-body-brown text-sm mb-2">Ravi Bhakti (Sun)</p>
                <p className="text-3xl font-bold text-saffron">
                  {result.raviBhakti}%
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-saffron/20 shadow-warm">
                <p className="text-body-brown text-sm mb-2">Chandra Bhakti (Moon)</p>
                <p className="text-3xl font-bold text-saffron">
                  {result.chandrakBhakti}%
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-saffron/20 shadow-warm">
                <p className="text-body-brown text-sm mb-2">Kuja Dosha</p>
                <p className={`text-xl font-bold ${result.kujaDosha ? 'text-red-600' : 'text-green-600'}`}>
                  {result.kujaDosha ? 'Present' : 'Not Present'}
                </p>
              </div>
            </div>

            {/* Matching Points */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-saffron mb-4">Matching Points</h3>
              <div className="bg-white rounded-lg p-6 border border-saffron/20 shadow-warm">
                <ul className="space-y-3">
                  {result.matchingPoints.map((point: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-saffron text-xl flex-shrink-0">✓</span>
                      <span className="text-body-brown">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Challenges */}
            {result.challenges.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-saffron mb-4">Challenges to Consider</h3>
                <div className="bg-white rounded-lg p-6 border border-red-400/30 shadow-warm">
                  <ul className="space-y-3">
                    {result.challenges.map((challenge: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-red-600 text-xl flex-shrink-0">!</span>
                        <span className="text-body-brown">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Remedies */}
            {result.remedies.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-saffron mb-4">Recommended Remedies</h3>
                <div className="bg-white rounded-lg p-6 border border-terracotta/20 shadow-warm">
                  <ul className="space-y-3">
                    {result.remedies.map((remedy: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-terracotta text-xl flex-shrink-0">🔮</span>
                        <span className="text-body-brown">{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="bg-white rounded-lg p-6 border border-saffron/20 shadow-warm">
              <h3 className="text-xl font-bold text-saffron mb-3">Summary</h3>
              <p className="text-body-brown leading-relaxed">{result.summary}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-ivory via-white to-warm-cream">
      <CompatibilityForm
        onSubmit={handleCompatibilityCheck}
        isLoading={loading}
      />
    </div>
  );
}
