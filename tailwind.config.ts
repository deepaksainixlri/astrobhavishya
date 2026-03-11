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
        ivory: '#FEFCF7',
        gold: {
          50: '#FDF8ED',
          100: '#FAF0D4',
          200: '#F5DFA8',
          300: '#ECC96F',
          400: '#DAA520',
          500: '#C8942D',
          600: '#A07528',
          700: '#7D5B1E',
          800: '#5C4316',
          900: '#3D2D10',
        },
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
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(15px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200, 148, 45, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(200, 148, 45, 0.6)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'depth': '0 1px 2px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.03), 0 16px 32px rgba(0,0,0,0.04)',
        'depth-lg': '0 2px 4px rgba(0,0,0,0.02), 0 8px 16px rgba(0,0,0,0.04), 0 32px 64px rgba(0,0,0,0.06)',
        'gold': '0 4px 14px rgba(200,148,45,0.15), 0 8px 32px rgba(200,148,45,0.1)',
        'gold-lg': '0 4px 14px rgba(200,148,45,0.2), 0 16px 48px rgba(200,148,45,0.15)',
        'cosmic': '0 0 20px rgba(107, 44, 255, 0.3)',
        'cosmic-lg': '0 0 40px rgba(107, 44, 255, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
