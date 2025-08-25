// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
      },
      keyframes: {
        'scale-on-hover': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px 2px rgba(255, 105, 180, 0.4)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(255, 105, 180, 0.7)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'scale-on-hover': 'scale-on-hover 300ms ease-in-out forwards',
        'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
        'gradient-text': 'gradient-shift 4s ease infinite',

      },
    },
  },
  plugins: [],
};
