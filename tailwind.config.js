/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0f0f13',
        electric: '#ff007f',
        acid: '#b2ff05',
        crimson: '#dc143c',
        gold: '#ffd700',
      },
      fontFamily: {
        cinematic: ['"Inter"', 'sans-serif'],
        typewriter: ['"Courier New"', 'monospace']
      },
      animation: {
        'shatter': 'shatter 1s forwards',
        'wiggle': 'wiggle 0.3s ease-in-out infinite',
      },
      keyframes: {
        shatter: {
          '0%': { transform: 'scale(1)', opacity: '1', filter: 'blur(0px)' },
          '50%': { transform: 'scale(1.5)', opacity: '0.8', filter: 'blur(4px)' },
          '100%': { transform: 'scale(2) rotate(45deg)', opacity: '0', filter: 'blur(10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
