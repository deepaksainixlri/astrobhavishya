'use client';

import { useState, useEffect } from 'react';

const ZODIAC_SIGNS = [
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

const ZODIAC_DATES: Record<string, string> = {
  Aries: 'Mar 21 - Apr 19',
  Taurus: 'Apr 20 - May 20',
  Gemini: 'May 21 - Jun 20',
  Cancer: 'Jun 21 - Jul 22',
  Leo: 'Jul 23 - Aug 22',
  Virgo: 'Aug 23 - Sep 22',
  Libra: 'Sep 23 - Oct 22',
  Scorpio: 'Oct 23 - Nov 21',
  Sagittarius: 'Nov 22 - Dec 21',
  Capricorn: 'Dec 22 - Jan 19',
  Aquarius: 'Jan 20 - Feb 18',
  Pisces: 'Feb 19 - Mar 20',
};

interface Horoscope {
  general: string;
  love: string;
  career: string;
  health: string;
  luckyNumber: number;
  luckyColor: string;
  rating: number;
}

export default function HoroscopePage() {
  const [selectedSign, setSelectedSign] = useState('Aries');
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    loadHoroscope(selectedSign, selectedDate);
  }, [selectedSign, selectedDate]);

  const loadHoroscope = async (sign: string, date: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/daily-horoscope?zodiac_sign=${sign}&date=${date}`
      );
      if (response.ok) {
        const data = await response.json();
        setHoroscope(data.horoscope);
      }
    } catch (error) {
      console.error('Failed to load horoscope:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#16213e] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#d4a574] mb-3">Daily Horoscope</h1>
          <p className="text-[#d4a574]/60">Cosmic guidance for your day</p>
        </div>

        {/* Date Selector */}
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#2d1b69] rounded-2xl p-6 border border-[#d4a574]/20 mb-8">
          <label className="block text-[#d4a574] font-semibold mb-3">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a1a] text-white rounded-lg border-2 border-[#d4a574]/30 focus:border-[#d4a574] focus:outline-none"
          />
        </div>

        {/* Zodiac Signs Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#d4a574] mb-6">Select Your Sign</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ZODIAC_SIGNS.map((sign) => (
              <button
                key={sign}
                onClick={() => setSelectedSign(sign)}
                className={`p-4 rounded-lg border-2 transition-all text-center cursor-pointer ${
                  selectedSign === sign
                    ? 'bg-[#d4a574] border-[#d4a574] text-[#0a0a1a] font-bold'
                    : 'bg-[#1e1b4b] border-[#d4a574]/30 text-[#d4a574] hover:border-[#d4a574]'
                }`}
              >
                <div className="text-2xl mb-2">{getZodiacEmoji(sign)}</div>
                <div className="text-sm font-medium">{sign}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Horoscope Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl animate-spin mb-4">✨</div>
            <p className="text-[#d4a574]">Loading horoscope...</p>
          </div>
        ) : horoscope ? (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-[#1e1b4b] to-[#2d1b69] rounded-2xl p-8 border border-[#d4a574]/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-[#d4a574] mb-1">
                    {selectedSign}
                  </h2>
                  <p className="text-[#d4a574]/60">{ZODIAC_DATES[selectedSign]}</p>
                </div>
                <div className="text-6xl">{getZodiacEmoji(selectedSign)}</div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-[#d4a574] font-bold">Today's Rating:</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < horoscope.rating ? 'text-[#d4a574] text-xl' : 'text-[#d4a574]/30 text-xl'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Horoscope Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HoroscopeSection
                title="General"
                icon="🌟"
                content={horoscope.general}
              />
              <HoroscopeSection
                title="Love & Relationships"
                icon="💕"
                content={horoscope.love}
              />
              <HoroscopeSection
                title="Career & Finance"
                icon="💼"
                content={horoscope.career}
              />
              <HoroscopeSection
                title="Health & Wellness"
                icon="🏥"
                content={horoscope.health}
              />
            </div>

            {/* Lucky Elements */}
            <div className="bg-gradient-to-br from-[#1e1b4b] to-[#2d1b69] rounded-2xl p-8 border border-[#d4a574]/20">
              <h3 className="text-2xl font-bold text-[#d4a574] mb-6">Lucky Elements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0a0a1a] rounded-lg p-6 border border-[#d4a574]/20">
                  <p className="text-[#d4a574]/60 text-sm mb-2">Lucky Number</p>
                  <p className="text-4xl font-bold text-[#d4a574]">
                    {horoscope.luckyNumber}
                  </p>
                </div>
                <div className="bg-[#0a0a1a] rounded-lg p-6 border border-[#d4a574]/20">
                  <p className="text-[#d4a574]/60 text-sm mb-2">Lucky Color</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-[#d4a574]"
                      style={{
                        backgroundColor: getColorHex(horoscope.luckyColor),
                      }}
                    />
                    <p className="text-2xl font-bold text-[#d4a574]">
                      {horoscope.luckyColor}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Button */}
            <div className="text-center">
              <button className="px-6 py-3 bg-[#d4a574] text-[#0a0a1a] font-bold rounded-lg hover:shadow-lg hover:shadow-[#d4a574]/50 transition-all">
                🔗 Share Horoscope
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#d4a574]/60">Unable to load horoscope. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface HoroscopeSectionProps {
  title: string;
  icon: string;
  content: string;
}

function HoroscopeSection({ title, icon, content }: HoroscopeSectionProps) {
  return (
    <div className="bg-gradient-to-br from-[#1e1b4b] to-[#2d1b69] rounded-2xl p-6 border border-[#d4a574]/20">
      <h3 className="text-lg font-bold text-[#d4a574] mb-4 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {title}
      </h3>
      <p className="text-[#d4a574]/80 leading-relaxed">{content}</p>
    </div>
  );
}

function getZodiacEmoji(sign: string): string {
  const emojis: Record<string, string> = {
    Aries: '♈',
    Taurus: '♉',
    Gemini: '♊',
    Cancer: '♋',
    Leo: '♌',
    Virgo: '♍',
    Libra: '♎',
    Scorpio: '♏',
    Sagittarius: '♐',
    Capricorn: '♑',
    Aquarius: '♒',
    Pisces: '♓',
  };
  return emojis[sign] || '⭐';
}

function getColorHex(colorName: string): string {
  const colors: Record<string, string> = {
    Red: '#ff4444',
    Blue: '#4444ff',
    Green: '#44ff44',
    Yellow: '#ffff44',
    Purple: '#ff44ff',
    Orange: '#ff8844',
    Pink: '#ff6699',
    Gold: '#ffd700',
  };
  return colors[colorName] || '#d4a574';
}
