'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'dark' | 'gradient';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'glass',
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';

  const variants = {
    glass: `
      backdrop-blur-md bg-white/70 border border-saffron/20
      hover:bg-white/85 hover:border-saffron/40 hover:shadow-warm-lg hover:shadow-saffron/20
      group
    `,
    dark: `
      bg-gradient-to-br from-warm-cream to-light-peach border border-saffron/20
      hover:border-saffron/50 hover:shadow-warm-lg hover:shadow-saffron/15
    `,
    gradient: `
      bg-gradient-to-br from-warm-cream/60 to-light-peach/60 border border-saffron/25
      hover:from-warm-cream/80 hover:to-light-peach/80 hover:border-saffron/50 hover:shadow-warm-lg hover:shadow-saffron/20
    `,
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
