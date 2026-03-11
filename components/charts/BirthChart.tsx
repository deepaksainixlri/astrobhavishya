'use client';

import React from 'react';

interface BirthChartProps {
  chartData: any;
}

const PLANET_ABBREV: Record<string, string> = {
  Sun: 'Su',
  Moon: 'Mo',
  Mars: 'Ma',
  Mercury: 'Me',
  Jupiter: 'Ju',
  Venus: 'Ve',
  Saturn: 'Sa',
  Rahu: 'Ra',
  Ketu: 'Ke',
};

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

const SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const BirthChart: React.FC<BirthChartProps> = ({ chartData }) => {
  const planetsInHouses: Record<number, string[]> = {};

  // Organize planets by house - supports both array and record formats
  const planetsObj = chartData.planets || {};
  if (Array.isArray(planetsObj)) {
    planetsObj.forEach((planet: any) => {
      const house = planet.house;
      if (!planetsInHouses[house]) {
        planetsInHouses[house] = [];
      }
      planetsInHouses[house].push(planet.planet || planet.name || 'Unknown');
    });
  } else {
    Object.entries(planetsObj).forEach(([name, planet]: [string, any]) => {
      const house = planet.house;
      if (!planetsInHouses[house]) {
        planetsInHouses[house] = [];
      }
      planetsInHouses[house].push(name);
    });
  }

  const renderNorthIndianChart = () => {
    const cellWidth = 120;
    const cellHeight = 100;
    const padding = 40;

    return (
      <svg
        viewBox={`0 0 ${cellWidth * 3 + padding * 2} ${cellHeight * 3 + padding * 2}`}
        className="w-full max-w-xl mx-auto"
      >
        {/* Background */}
        <rect
          x={padding}
          y={padding}
          width={cellWidth * 3}
          height={cellHeight * 3}
          fill="#0a0a1a"
          stroke="#d4a574"
          strokeWidth="2"
        />

        {/* Grid lines for houses */}
        {[1, 2].map((i) => (
          <line
            key={`v${i}`}
            x1={padding + cellWidth * i}
            y1={padding}
            x2={padding + cellWidth * i}
            y2={padding + cellHeight * 3}
            stroke="#d4a574"
            strokeWidth="2"
          />
        ))}
        {[1, 2].map((i) => (
          <line
            key={`h${i}`}
            x1={padding}
            y1={padding + cellHeight * i}
            x2={padding + cellWidth * 3}
            y2={padding + cellHeight * i}
            stroke="#d4a574"
            strokeWidth="2"
          />
        ))}

        {/* Diagonal lines for houses 1-4 */}
        <line
          x1={padding + cellWidth}
          y1={padding}
          x2={padding + cellWidth * 2}
          y2={padding + cellHeight}
          stroke="#d4a574"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1={padding + cellWidth * 2}
          y1={padding}
          x2={padding + cellWidth}
          y2={padding + cellHeight}
          stroke="#d4a574"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Render houses */}
        {[
          { house: 12, x: 0, y: 0 },
          { house: 1, x: 1, y: 0 },
          { house: 2, x: 2, y: 0 },
          { house: 11, x: 0, y: 1 },
          { house: 0, x: 1, y: 1 },
          { house: 3, x: 2, y: 1 },
          { house: 10, x: 0, y: 2 },
          { house: 9, x: 1, y: 2 },
          { house: 4, x: 2, y: 2 },
        ].map(({ house, x, y }) => {
          const centerX = padding + x * cellWidth + cellWidth / 2;
          const centerY = padding + y * cellHeight + cellHeight / 2;
          const planetsList = planetsInHouses[house] || [];
          const ascendantName = typeof chartData.ascendant === 'string'
            ? chartData.ascendant
            : chartData.ascendant?.rashi || 'Aries';
          const sign = house === 0 ? ascendantName : SIGNS[(house - 1) % 12];

          return (
            <g key={`house-${house}`}>
              {/* House number background */}
              {house !== 0 && (
                <text
                  x={padding + x * cellWidth + 10}
                  y={padding + y * cellHeight + 25}
                  fontSize="16"
                  fontWeight="bold"
                  fill="#d4a574"
                  opacity="0.6"
                >
                  {house}
                </text>
              )}

              {/* Sign name */}
              <text
                x={centerX}
                y={centerY - 10}
                fontSize="12"
                fill="#d4a574"
                opacity="0.8"
                textAnchor="middle"
              >
                {sign.substring(0, 3)}
              </text>

              {/* Planets in house */}
              {planetsList.map((planetName, idx) => {
                const planet = Array.isArray(planetsObj)
                  ? planetsObj.find((p: any) => (p.planet || p.name) === planetName)
                  : planetsObj[planetName];
                const abbrev = PLANET_ABBREV[planetName] || planetName.substring(0, 2);
                const offset = idx * 20;

                return (
                  <g key={`planet-${house}-${planetName}`}>
                    <circle
                      cx={centerX - 20 + offset}
                      cy={centerY + 15}
                      r="12"
                      fill={PLANET_COLORS[planetName] || '#d4a574'}
                      opacity="0.9"
                      stroke="#d4a574"
                      strokeWidth="1"
                    />
                    <text
                      x={centerX - 20 + offset}
                      y={centerY + 19}
                      fontSize="10"
                      fontWeight="bold"
                      fill={planetName === 'Moon' ? '#0a0a1a' : '#0a0a1a'}
                      textAnchor="middle"
                    >
                      {abbrev}
                    </text>
                    {planet?.isRetrograde && (
                      <text
                        x={centerX - 20 + offset + 10}
                        y={centerY + 8}
                        fontSize="8"
                        fill="#ff6666"
                        fontWeight="bold"
                      >
                        R
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Ascendant label */}
        <text
          x={padding + cellWidth * 1.5}
          y={padding - 10}
          fontSize="12"
          fill="#d4a574"
          textAnchor="middle"
          fontWeight="bold"
        >
          Ascendant: {typeof chartData.ascendant === 'string' ? chartData.ascendant : chartData.ascendant?.rashi || ''}
        </text>
      </svg>
    );
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#1e1b4b] to-[#2d1b69] rounded-2xl p-8 border border-[#d4a574]/20">
      <h2 className="text-2xl font-bold text-[#d4a574] mb-6 text-center">
        Vedic Birth Chart
      </h2>

      {/* Chart */}
      <div className="mb-8 overflow-auto">
        {renderNorthIndianChart()}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#d4a574]/20">
        {Object.entries(PLANET_ABBREV).map(([name, abbrev]) => (
          <div key={name} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full border-2 border-[#d4a574]"
              style={{ backgroundColor: PLANET_COLORS[name] || '#d4a574' }}
            />
            <span className="text-[#d4a574]/80 text-sm">
              {abbrev} = {name}
            </span>
          </div>
        ))}
      </div>

      {/* Key Information */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#d4a574]/20">
        <div>
          <p className="text-[#d4a574]/60 text-xs">Sun Sign</p>
          <p className="text-white font-bold">{chartData.sunSign || (Array.isArray(chartData.planets) ? chartData.planets.find((p: any) => p.planet === 'Sun')?.rashi : '') || ''}</p>
        </div>
        <div>
          <p className="text-[#d4a574]/60 text-xs">Moon Sign</p>
          <p className="text-white font-bold">{chartData.moonSign || (Array.isArray(chartData.planets) ? chartData.planets.find((p: any) => p.planet === 'Moon')?.rashi : '') || ''}</p>
        </div>
        <div>
          <p className="text-[#d4a574]/60 text-xs">Ascendant</p>
          <p className="text-white font-bold">{typeof chartData.ascendant === 'string' ? chartData.ascendant : chartData.ascendant?.rashi || ''}</p>
        </div>
        <div>
          <p className="text-[#d4a574]/60 text-xs">Nakshatra</p>
          <p className="text-white font-bold">{chartData.nakshatra || chartData.ascendant?.nakshatra || (Array.isArray(chartData.planets) ? chartData.planets.find((p: any) => p.planet === 'Moon')?.nakshatra : '') || ''}</p>
        </div>
      </div>
    </div>
  );
};
