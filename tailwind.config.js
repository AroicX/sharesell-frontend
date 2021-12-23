const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-color': '#A55954',
        'app-text': '#632121',
        'app-text-light': '#DCA587',
        'app-cream': '#FFF6F0',
        'terms': '#E77435'
      },
      screens: {
        md: '800px',
      },
    },
    fontFamily: {
      sans: ['SF Pro', ...defaultTheme.fontFamily.sans],
      serif: ['DM Serif Display', ...defaultTheme.fontFamily.serif],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
