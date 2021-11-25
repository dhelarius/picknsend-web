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
        error: '#c13832',
        warning: '#ffe614',
        success: '#03af43'
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
