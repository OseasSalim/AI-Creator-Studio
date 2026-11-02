import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1010',
        surface: '#171E1C',
        acid: '#B5F34A',
        paper: '#F5F7F2',
        muted: '#A8B4A5',
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: { glow: '0 0 48px rgba(181, 243, 74, 0.12)' },
    },
  },
  plugins: [],
} satisfies Config;
