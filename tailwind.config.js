const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        anime: {
          "0%, 100%": { backgroundColor: "rgba(255, 182, 193, 1)" },
          "50%": { backgroundColor: "rgba(255, 200, 220, 1)" },
          "100%": { backgroundColor: "rgba(255, 182, 193, 1)" },
        },
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
        anime: "anime 4s infinite alternate",
        "flap-right": "flap-right 1s infinite",
        "flap-left": "flap-left 1s infinite",
        "pulse-heart": "pulse-heart 1s infinite",
      },
      fontFamily: {
        bpg: ['BPGExtraSquare', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        dejavu: ['DejaVuSans', 'sans-serif'],
        firago: ['FiraGo', 'sans-serif'],
        gakruli: ['Gakruli', 'sans-serif'],
        dancing: ["'Dancing Script'", ...fontFamily.sans],
        oswald: ['Oswald', ...fontFamily.sans], 
        sans: [...fontFamily.sans],
      },
      colors: {
        main: '#ff5b5b',
        bgColor: 'hsl(var(--background))',
        bgDark: 'hsl(var(--background))',
        grey: '#262626',
      },
    },
  },
  plugins: [],
};
