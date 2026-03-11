import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'zodiac' | 'tier' | 'accent' | 'success';
  children: React.ReactNode;
}

const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const zodiacColors: Record<string, string> = {
  'Aries': 'from-red-600 to-orange-600',
  'Taurus': 'from-green-600 to-emerald-600',
  'Gemini': 'from-yellow-600 to-amber-600',
  'Cancer': 'from-slate-500 to-blue-500',
  'Leo': 'from-yellow-500 to-orange-600',
  'Virgo': 'from-green-500 to-teal-600',
  'Libra': 'from-pink-500 to-purple-600',
  'Scorpio': 'from-purple-700 to-indigo-700',
  'Sagittarius': 'from-purple-600 to-pink-600',
  'Capricorn': 'from-slate-700 to-slate-600',
  'Aquarius': 'from-cyan-600 to-blue-600',
  'Pisces': 'from-teal-500 to-cyan-500',
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
      ${colorClass ? `bg-gradient-to-r ${colorClass}` : 'bg-gradient-to-r from-purple-600 to-indigo-600'}
      text-white text-xs font-bold shadow-lg shadow-saffron/20
    `,
    tier: `
      inline-flex items-center justify-center px-4 py-2 rounded-full
      bg-gradient-to-r from-saffron-light to-saffron-bright
      text-dark-brown text-xs font-bold shadow-lg shadow-saffron/30
    `,
    accent: `
      inline-flex items-center justify-center px-3 py-1.5 rounded-full
      border border-saffron/50 bg-saffron/15
      text-saffron text-xs font-semibold
    `,
    success: `
      inline-flex items-center justify-center px-3 py-1.5 rounded-full
      border border-green-500/50 bg-green-50
      text-green-700 text-xs font-semibold
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
