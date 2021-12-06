const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mplusrounded: ['"M PLUS Rounded 1c"', 'sans-serif']
      },
      colors: {
        transparent: 'transparent',
        picknsend: {
          light: '#c9eb40',
          DEFAULT: '#94d500',
          dark: '	#87c002'
        },
        blue: '#2e7ce0',
        gray: {
          light: '#e1e1e1',
          soft: '#878787',
          dark: '#363636'
        },
        white: '#ffffff',
        cream: '#e1d0a5',
        success: {
          surface: '#ECFDF5',
          light: '#D1FAE5',
          DEFAULT: '#34D399',
          dark: '#059669'
        },
        warning: {
          surface: '#FFFBEB',
          light: '#FEF3C7',
          DEFAULT: '#FBBF24',
          dark: '#D97706'
        },
        error: {
          surface: '#FEF2F2',
          light: '#FEE2E2',
          DEFAULT: '#EF4444',
          dark: '#B91C1C'
        }
      }
    }
    },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
