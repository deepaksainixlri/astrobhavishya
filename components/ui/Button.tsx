import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-saffron-light to-saffron-bright text-dark-brown hover:shadow-lg hover:shadow-saffron/50 hover:scale-105 active:scale-95',
    secondary: 'bg-terracotta text-white hover:bg-terracotta-light hover:shadow-lg hover:shadow-terracotta/50 hover:scale-105 active:scale-95',
    outline: 'border-2 border-saffron text-saffron hover:bg-saffron/10 hover:shadow-lg hover:shadow-saffron/30',
    ghost: 'text-saffron hover:bg-saffron/10 hover:shadow-lg hover:shadow-saffron/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
