'use client';

import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-saffron-light opacity-60">
            {icon}
          </div>
        )}
        <input
          {...props}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-white border-2 border-saffron/15
            text-dark-brown placeholder-transparent
            transition-all duration-300
            focus:outline-none focus:border-saffron focus:bg-white focus:shadow-lg focus:shadow-saffron/20
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-red-400 focus:border-red-400 focus:shadow-red-200' : ''}
            ${className}
          `}
        />
        {label && (
          <label
            className={`
              absolute left-4 top-1/2 -translate-y-1/2
              text-saffron-light text-sm font-medium
              transition-all duration-300 pointer-events-none
              ${isFocused || hasValue ? '-top-2.5 bg-gradient-to-b from-warm-ivory to-transparent px-2 text-xs' : ''}
              ${icon && !isFocused && !hasValue ? 'left-12' : ''}
            `}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 text-opacity-80">{error}</p>
      )}
    </div>
  );
};
