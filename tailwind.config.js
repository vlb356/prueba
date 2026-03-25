/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          950: '#030A1A',
          900: '#081731',
          800: '#0D2550',
          700: '#12316D',
        },
        accent: {
          500: '#FF7A00',
          400: '#FF9633',
          300: '#FFB066',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 18px 70px rgba(5, 16, 39, 0.45)',
        orange: '0 10px 30px rgba(255, 122, 0, 0.25)',
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 20% 10%, rgba(255,122,0,0.15), transparent 28%), radial-gradient(circle at 80% 0%, rgba(88,126,255,0.25), transparent 35%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
