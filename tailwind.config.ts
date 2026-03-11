import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          50: '#f9f7ff',
          100: '#f3f0ff',
          200: '#e9deff',
          300: '#d8c6ff',
          400: '#b8a0ff',
          500: '#9374ff',
          600: '#7c48ff',
          700: '#6b2cff',
          800: '#5a1fa8',
          900: '#3d1166',
          950: '#2a0a47',
        },
        astro: {
          dark: '#0f0b1e',
          darker: '#0a0815',
          gold: '#d4af37',
          gold_light: '#e8c547',
          gold_dark: '#b8941f',
          silver: '#c0c0c0',
          purple: '#9374ff',
          purple_dark: '#6b2cff',
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0f0b1e 0%, #1a0033 50%, #2a0a47 100%)',
        'cosmic-radial': 'radial-gradient(circle at 20% 50%, #6b2cff 0%, #0f0b1e 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #0f0b1e 0%, #d4af37 50%, #0f0b1e 100%)',
        'star-pattern': 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
      },
      backgroundSize: {
        'star-pattern': '50px 50px',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'cosmic': '0 0 20px rgba(107, 44, 255, 0.3)',
        'cosmic-lg': '0 0 40px rgba(107, 44, 255, 0.5)',
        'gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.5)',
      },
      borderColor: {
        cosmic: 'rgba(212, 175, 55, 0.3)',
      },
      divideColor: {
        cosmic: 'rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
