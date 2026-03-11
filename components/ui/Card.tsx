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
      backdrop-blur-md bg-white/5 border border-white/10
      hover:bg-white/8 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/20
      group
    `,
    dark: `
      bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800
      hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20
    `,
    gradient: `
      bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20
      hover:from-purple-900/60 hover:to-indigo-900/60 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-purple-500/20
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
