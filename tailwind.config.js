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
      },
      extend: {
        keyframes: {
          "flap-right": {
            "0%, 100%": { transform: "rotate(-10deg) translate(250px, 0)" },
            "50%": { transform: "rotate(-5deg) translate(250px, 0)" },
          },
          "flap-left": {
            "0%, 100%": { transform: "rotate(10deg) translate(-248px, 0)" },
            "50%": { transform: "rotate(5deg) translate(-248px, 0)" },
          },
          "pulse-heart": {
            "0%, 100%": { transform: "scale(0.8)" },
            "50%": { transform: "scale(0.92) translateY(12px)" },
          },
        },
        animation: {
          "flap-right": "flap-right 1s infinite",
          "flap-left": "flap-left 1s infinite",
          "pulse-heart": "pulse-heart 1s infinite",
        },
      },
    },
  },
  plugins: [],
};
