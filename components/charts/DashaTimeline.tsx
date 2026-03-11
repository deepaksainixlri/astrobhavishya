'use client';

import React, { useState } from 'react';
import { DashaInfo } from '@/lib/types';

interface DashaTimelineProps {
  dashaInfo: DashaInfo;
}

const PLANET_COLORS: Record<string, string> = {
  Sun: '#ff4444',
  Moon: '#ffffff',
  Mars: '#ff4444',
  Mercury: '#44ff44',
  Jupiter: '#ffdd44',
  Venus: '#ffaa44',
  Saturn: '#888888',
  Rahu: '#663366',
  Ketu: '#663366',
};

export const DashaTimeline: React.FC<DashaTimelineProps> = ({ dashaInfo }) => {
  const [expandedDasha, setExpandedDasha] = useState<string | null>(null);

  const mahadashaStart = new Date(dashaInfo.mahadashaStart);
  const mahadashaEnd = new Date(dashaInfo.mahadashaEnd);
  const antardashaStart = new Date(dashaInfo.antardashaStart);
  const antardashaEnd = new Date(dashaInfo.antardashaEnd);

  const totalDuration = mahadashaEnd.getTime() - mahadashaStart.getTime();
  const elapsedDuration = new Date().getTime() - mahadashaStart.getTime();
  const progressPercentage = Math.min(
    100,
    Math.max(0, (elapsedDuration / totalDuration) * 100)
  );

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatDuration = (start: Date, end: Date): string => {
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);

    if (years > 0) {
      return `${years}y ${months}m`;
    }
    return `${months}m`;
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#1e1b4b] to-[#2d1b69] rounded-2xl p-8 border border-[#d4a574]/20">
      <h2 className="text-2xl font-bold text-[#d4a574] mb-2 text-center">
        Vimshottari Dasha Timeline
      </h2>
      <p className="text-center text-[#d4a574]/60 text-sm mb-8">
        Major planetary periods influencing your life
      </p>

      {/* Mahadasha Info */}
      <div className="mb-8">
        <div
          className="cursor-pointer"
          onClick={() => setExpandedDasha(expandedDasha === 'maha' ? null : 'maha')}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: PLANET_COLORS[dashaInfo.mahadashaLord] || '#d4a574' }}
              />
              <div>
                <p className="text-white font-bold">
                  {dashaInfo.mahadashaLord} Mahadasha
                </p>
                <p className="text-[#d4a574]/60 text-sm">
                  {formatDate(mahadashaStart)} to {formatDate(mahadashaEnd)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#d4a574] font-semibold">
                {formatDuration(mahadashaStart, mahadashaEnd)}
              </p>
              <p className="text-[#d4a574]/60 text-xs">
                {progressPercentage.toFixed(0)}% elapsed
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#0a0a1a] rounded-full h-3 overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#d4a574] to-[#7c3aed] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Expand/Collapse Icon */}
          <div className="flex justify-end mb-4">
            <span className="text-[#d4a574] text-sm">
              {expandedDasha === 'maha' ? '−' : '+'} Antardasha Periods
            </span>
          </div>
        </div>

        {/* Antardasha Details */}
        {expandedDasha === 'maha' && (
          <div className="bg-[#0a0a1a] rounded-lg p-6 border border-[#d4a574]/20 mt-4">
            <h4 className="text-[#d4a574] font-semibold mb-4">
              Current Antardasha Period
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium">
                    {dashaInfo.antardashaLord} Antardasha
                  </p>
                  <p className="text-[#d4a574]/60 text-sm">
                    {formatDate(antardashaStart)} to {formatDate(antardashaEnd)}
                  </p>
                </div>
                <p className="text-[#d4a574] font-semibold">
                  {formatDuration(antardashaStart, antardashaEnd)}
                </p>
              </div>

              <div className="pt-4 border-t border-[#d4a574]/20">
                <p className="text-[#d4a574]/60 text-sm mb-3">Duration Progress</p>
                <div className="w-full bg-[#1e1b4b] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7c3aed] to-[#d4a574]"
                    style={{ width: `${dashaInfo.durationPercentage}%` }}
                  />
                </div>
                <p className="text-[#d4a574] text-xs mt-2">
                  {dashaInfo.durationPercentage.toFixed(0)}% completed
                </p>
              </div>

              <div className="pt-4 border-t border-[#d4a574]/20 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#d4a574]/60 text-xs">Mahadasha</p>
                  <p className="text-white font-medium">{dashaInfo.mahadashaLord}</p>
                </div>
                <div>
                  <p className="text-[#d4a574]/60 text-xs">Antardasha</p>
                  <p className="text-white font-medium">{dashaInfo.antardashaLord}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dasha Interpretation */}
      <div className="bg-[#0a0a1a] rounded-lg p-6 border border-[#d4a574]/20 mt-8">
        <h4 className="text-[#d4a574] font-semibold mb-4">Current Period Influence</h4>
        <div className="space-y-3 text-[#d4a574]/80 text-sm">
          <p>
            You are currently in the <strong>{dashaInfo.mahadashaLord} Mahadasha</strong>, a significant
            period in your life lasting approximately{' '}
            <strong>{formatDuration(mahadashaStart, mahadashaEnd)}</strong>.
          </p>
          <p>
            Within this period, you are experiencing the{' '}
            <strong>{dashaInfo.antardashaLord} Antardasha</strong> (sub-period),
            which brings specific themes and challenges related to {dashaInfo.antardashaLord.toLowerCase()}'s
            qualities.
          </p>
          <p>
            The transition between Dasha periods is a significant milestone in Vedic
            astrology. Stay aware of major life changes as they may align with these
            astronomical cycles.
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#d4a574]/20">
        <div className="bg-[#0a0a1a] rounded-lg p-4 border border-[#d4a574]/10">
          <p className="text-[#d4a574]/60 text-xs mb-2">Total Mahadasha Duration</p>
          <p className="text-white font-bold text-lg">
            {formatDuration(mahadashaStart, mahadashaEnd)}
          </p>
        </div>
        <div className="bg-[#0a0a1a] rounded-lg p-4 border border-[#d4a574]/10">
          <p className="text-[#d4a574]/60 text-xs mb-2">Time Elapsed</p>
          <p className="text-white font-bold text-lg">
            {formatDuration(mahadashaStart, new Date())}
          </p>
        </div>
        <div className="bg-[#0a0a1a] rounded-lg p-4 border border-[#d4a574]/10">
          <p className="text-[#d4a574]/60 text-xs mb-2">Time Remaining</p>
          <p className="text-white font-bold text-lg">
            {formatDuration(new Date(), mahadashaEnd)}
          </p>
        </div>
      </div>
    </div>
  );
};
