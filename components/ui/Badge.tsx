import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'zodiac' | 'tier' | 'accent' | 'success';
  children: React.ReactNode;
}

const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const zodiacColors: Record<string, string> = {
  'Aries': 'from-red-500 to-orange-500',
  'Taurus': 'from-green-500 to-emerald-500',
  'Gemini': 'from-yellow-500 to-amber-500',
  'Cancer': 'from-gray-400 to-blue-400',
  'Leo': 'from-yellow-400 to-orange-500',
  'Virgo': 'from-green-400 to-teal-500',
  'Libra': 'from-pink-400 to-purple-400',
  'Scorpio': 'from-purple-600 to-indigo-600',
  'Sagittarius': 'from-purple-500 to-pink-500',
  'Capricorn': 'from-gray-600 to-slate-600',
  'Aquarius': 'from-cyan-500 to-blue-500',
  'Pisces': 'from-teal-400 to-cyan-400',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'accent',
  children,
  className = '',
  ...props
}) => {
  const isZodiac = zodiacSigns.some(sign => typeof children === 'string' && children.includes(sign));
  const colorClass = isZodiac && typeof children === 'string'
    ? Object.entries(zodiacColors).find(([sign]) => children.includes(sign))?.[1]
    : undefined;

  const variants = {
    zodiac: `
      inline-flex items-center justify-center px-4 py-2 rounded-full
      ${colorClass ? `bg-gradient-to-r ${colorClass}` : 'bg-gradient-to-r from-purple-500 to-indigo-500'}
      text-white text-xs font-bold shadow-lg shadow-purple-500/30
    `,
    tier: `
      inline-flex items-center justify-center px-4 py-2 rounded-full
      bg-gradient-to-r from-amber-500 to-orange-500
      text-gray-900 text-xs font-bold shadow-lg shadow-amber-500/30
    `,
    accent: `
      inline-flex items-center justify-center px-3 py-1.5 rounded-full
      border border-amber-500/50 bg-amber-500/10
      text-amber-300 text-xs font-semibold
    `,
    success: `
      inline-flex items-center justify-center px-3 py-1.5 rounded-full
      border border-green-500/50 bg-green-500/10
      text-green-300 text-xs font-semibold
    `,
  };

  return (
    <div
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
