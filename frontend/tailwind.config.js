/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#FAF7FD',
          100: '#F8F4FC', // section background
          200: '#EBDCF8',
          300: '#DABFF2',
          400: '#C8A5EA', // secondary
          500: '#A678D6', // primary
          600: '#8755B9', // hover
          700: '#6C3FA0',
          800: '#532D7F',
          900: '#3A1E5C',
        },
        charcoal: '#292433', // dark text
        mutedgrey: '#77717F', // secondary text
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        telugu: ['Noto Sans Telugu', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(166, 120, 214, 0.12)',
        'card': '0 10px 30px -5px rgba(41, 36, 51, 0.06), 0 4px 12px -2px rgba(166, 120, 214, 0.08)',
        'lavender': '0 8px 24px -4px rgba(166, 120, 214, 0.35)',
      }
    },
  },
  plugins: [],
}
