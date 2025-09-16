const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#34D399',
          dark: '#059669'
        },
        accent: '#7C3AED',
        badge: '#FBBF24',
        surface: 'var(--color-surface)',
        surfaceAlt: 'var(--color-surface-alt)',
        baseText: 'var(--color-text-base)',
        softText: 'var(--color-text-soft)'
      },
      boxShadow: {
        soft: '0 4px 16px rgba(0,0,0,0.08)'
      },
      keyframes: {
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        bob: 'bob 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
