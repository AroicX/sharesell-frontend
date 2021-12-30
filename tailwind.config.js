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
        'terms': '#E77435',
        'pry-black': '#0D0D0D',
        'lightest-color': '#F1CFBB',
        'green': "#219653",
        'light-green': "#B7F3D0",
        'lightest-green' : "#D7FCE6",
        'light-cream' : "#FDF0E1",
        'light-border': "#FCE3C8",
        'app-brown': "#ECE6E4",
        'dark-brown': "#A78989",
        'nice-brown' : "#BD8C70",
        'app-cream-light': "#FFF7F4"
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
