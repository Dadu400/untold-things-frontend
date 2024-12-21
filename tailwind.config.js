const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bpg: ['BPGExtraSquare', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        dejavu: ['DejaVuSans', 'sans-serif'],
        firago: ['FiraGo', 'sans-serif'],
        sans: [...fontFamily.sans],
      },
      colors : {
        main: '#ff5b5b',
        bgColor: '#fafafa',
        grey: '#262626',
      }
    },
  },
  plugins: [],
};
