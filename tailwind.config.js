const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bpg: ['BPGExtraSquare', 'sans-serif'],
        alk: ['CustomFont2', 'sans-serif'],
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
