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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 opacity-60">
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
            bg-white/5 border-2 border-white/10
            text-white placeholder-transparent
            transition-all duration-300
            focus:outline-none focus:border-amber-500 focus:bg-white/10 focus:shadow-lg focus:shadow-amber-500/20
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:shadow-red-500/20' : ''}
            ${className}
          `}
        />
        {label && (
          <label
            className={`
              absolute left-4 top-1/2 -translate-y-1/2
              text-amber-400 text-sm font-medium
              transition-all duration-300 pointer-events-none
              ${isFocused || hasValue ? '-top-2.5 bg-gradient-to-b from-gray-950 to-transparent px-2 text-xs' : ''}
              ${icon && !isFocused && !hasValue ? 'left-12' : ''}
            `}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400 text-opacity-80">{error}</p>
      )}
    </div>
  );
};
