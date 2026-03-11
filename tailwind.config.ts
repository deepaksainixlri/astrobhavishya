import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'warm-ivory': '#FFFDF5',
        'warm-cream': '#FFF9E8',
        'light-peach': '#FFEDE0',
        'saffron': '#D4920B',
        'saffron-light': '#E8A317',
        'saffron-bright': '#F5B041',
        'terracotta': '#8B2500',
        'terracotta-light': '#A0522D',
        'dark-brown': '#2C1810',
        'body-brown': '#5D4037',
        'golden': '#F5D547',
        astro: {
          ivory: '#FFFDF5',
          cream: '#FFF9E8',
          peach: '#FFEDE0',
          saffron: '#D4920B',
          'saffron-light': '#E8A317',
          'saffron-bright': '#F5B041',
          terracotta: '#8B2500',
          'terracotta-light': '#A0522D',
          'dark-brown': '#2C1810',
          'body-brown': '#5D4037',
        },
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FFFDF5 0%, #FFF9E8 50%, #FFEDE0 100%)',
        'cream-to-peach': 'linear-gradient(180deg, #FFF9E8 0%, #FFEDE0 100%)',
        'saffron-gradient': 'linear-gradient(135deg, #D4920B 0%, #E8A317 50%, #F5B041 100%)',
        'gold-subtle': 'linear-gradient(90deg, #FFFDF5 0%, #E8A317 50%, #FFFDF5 100%)',
      },
      backgroundSize: {
        'pattern': '50px 50px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 146, 11, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 146, 11, 0.5)' },
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
        'warm': '0 4px 6px rgba(212, 146, 11, 0.1)',
        'warm-md': '0 8px 16px rgba(212, 146, 11, 0.15)',
        'warm-lg': '0 12px 24px rgba(212, 146, 11, 0.2)',
      },
      borderColor: {
        warm: 'rgba(232, 163, 23, 0.2)',
      },
      divideColor: {
        warm: 'rgba(232, 163, 23, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
