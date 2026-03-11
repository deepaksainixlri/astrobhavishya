'use client';

import React, { useState } from 'react';
import { CompatibilityForm } from '@/components/forms/CompatibilityForm';
import { BirthDetails } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';

interface GunaScore {
  guna: string;
  maxPoints: number;
  earnedPoints: number;
  percentage: number;
  description: string;
}

interface CompatibilityResult {
  success: boolean;
  person1: string;
  person2: string;
  compatibility: {
    totalScore: number;
    maxScore: number;
    percentage: number;
    compatibility: string;
    gunaScores: GunaScore[];
    description: string;
    recommendations: string[];
    strengthAreas: string[];
    challengeAreas: string[];
  };
}

export default function CompatibilityPage() {
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCompatibilityCheck = async (person1: BirthDetails, person2: BirthDetails) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/check-compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          person1: {
            fullName: person1.name,
            dateOfBirth: person1.dateOfBirth,
            timeOfBirth: person1.timeOfBirth,
            placeOfBirth: person1.placeOfBirth,
            latitude: person1.latitude || undefined,
            longitude: person1.longitude || undefined,
          },
          person2: {
            fullName: person2.name,
            dateOfBirth: person2.dateOfBirth,
            timeOfBirth: person2.timeOfBirth,
            placeOfBirth: person2.placeOfBirth,
            latitude: person2.latitude || undefined,
            longitude: person2.longitude || undefined,
          },
          gender1: person1.gender === 'male' ? 'M' : 'F',
          gender2: person2.gender === 'male' ? 'M' : 'F',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        const errData = await response.json();
        setError(errData.error || 'Failed to check compatibility');
      }
    } catch (err) {
      console.error('Compatibility check failed:', err);
      setError('Failed to check compatibility. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-400';
    if (percentage >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBarColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  if (result) {
    const { compatibility: compat } = result;

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#16213e] p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setResult(null)}
            className="mb-8 px-4 py-2 text-[#d4a574] hover:text-[#d4a574]/80 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Form
          </button>

          <div className="bg-gradient-to-br from-[#1e1b4b] to-[#2d1b69] rounded-2xl p-8 border border-[#d4a574]/20">
            <h1 className="text-3xl font-bold text-[#d4a574] mb-2 text-center">
              Compatibility Report
            </h1>
            <p className="text-center text-[#d4a574]/60 mb-8">
              {result.person1} & {result.person2}
            </p>

            {/* Overall Score */}
            <div className="bg-[#0a0a1a] rounded-lg p-8 mb-8 text-center border border-[#d4a574]/20">
              <p className="text-[#d4a574]/60 text-sm mb-3">Overall Compatibility</p>
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(compat.percentage)}`}>
                {Math.round(compat.percentage)}%
              </div>
              <p className="text-lg font-semibold text-[#d4a574] mb-4">{compat.compatibility}</p>
              <p className="text-sm text-[#d4a574]/60">
                {compat.totalScore} / {compat.maxScore} Guna Points
              </p>
              <div className="w-full bg-gray-800 rounded-full h-3 mt-4">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${getScoreBarColor(compat.percentage)}`}
                  style={{ width: `${compat.percentage}%` }}
                />
              </div>
            </div>

            {/* 8 Guna Scores */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#d4a574] mb-4">Ashtakoota (8-Fold) Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {compat.gunaScores.map((guna, idx) => (
                  <div key={idx} className="bg-[#0a0a1a] rounded-lg p-4 border border-[#d4a574]/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#d4a574] font-semibold">{guna.guna}</span>
                      <span className={`font-bold ${getScoreColor(guna.percentage)}`}>
                        {guna.earnedPoints}/{guna.maxPoints}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full ${getScoreBarColor(guna.percentage)}`}
                        style={{ width: `${guna.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#d4a574]/50">{guna.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            {compat.strengthAreas.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#d4a574] mb-4">Strength Areas</h3>
                <div className="bg-[#0a0a1a] rounded-lg p-6 border border-green-500/20">
                  <ul className="space-y-3">
                    {compat.strengthAreas.map((area, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        <span className="text-[#d4a574]/80 text-sm">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Challenges */}
            {compat.challengeAreas.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#d4a574] mb-4">Challenges to Consider</h3>
                <div className="bg-[#0a0a1a] rounded-lg p-6 border border-red-500/20">
                  <ul className="space-y-3">
                    {compat.challengeAreas.map((area, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-red-400 flex-shrink-0">!</span>
                        <span className="text-[#d4a574]/80 text-sm">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {compat.recommendations.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#d4a574] mb-4">Recommendations</h3>
                <div className="bg-[#0a0a1a] rounded-lg p-6 border border-[#7c3aed]/20">
                  <ul className="space-y-3">
                    {compat.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#7c3aed] flex-shrink-0">★</span>
                        <span className="text-[#d4a574]/80 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="bg-[#0a0a1a] rounded-lg p-6 border border-[#d4a574]/20">
              <h3 className="text-xl font-bold text-[#d4a574] mb-3">Summary</h3>
              <p className="text-[#d4a574]/80 leading-relaxed text-sm">{compat.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#16213e]">
      {error && (
        <div className="max-w-4xl mx-auto pt-4 px-4">
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      )}
      <CompatibilityForm
        onSubmit={handleCompatibilityCheck}
        isLoading={loading}
      />
    </div>
  );
}
