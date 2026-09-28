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
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "overlay-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "dialog-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "heart-pop": {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.3)" },
          "65%": { transform: "scale(0.92)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        anime: "anime 4s infinite alternate",
        "flap-right": "flap-right 1s infinite",
        "flap-left": "flap-left 1s infinite",
        "pulse-heart": "pulse-heart 1s infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "overlay-in": "overlay-in 0.2s ease-out both",
        "dialog-in": "dialog-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.22, 1, 0.36, 1) both",
        "heart-pop": "heart-pop 0.45s ease-out",
      },
      fontFamily: {
        bpg: ['BPGExtraSquare', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        dejavu: ['DejaVuSans', 'sans-serif'],
        firago: ['FiraGo', 'sans-serif'],
        gakruli: ['Gakruli', 'sans-serif'],
        dancing: ["'Dancing Script'", ...fontFamily.sans],
        oswald: ['Oswald', ...fontFamily.sans], 
        // Georgian reading face (63Font) for messages and long text; Latin falls back to the system sans.
        read: ['Font63', ...fontFamily.sans],
        // Dialog/modal headings.
        heading: ['FiraGOText', ...fontFamily.sans],
        sans: [...fontFamily.sans],
      },
      colors: {
        main: '#ff5b5b',
        bgColor: 'hsl(var(--background) / <alpha-value>)',
        bgDark: 'hsl(var(--background) / <alpha-value>)',
        grey: '#262626',
        brand: {
          DEFAULT: '#D93835',
          hover: '#C42F2C',
          soft: 'hsl(var(--brand-soft) / <alpha-value>)',
        },
        periwinkle: '#a4bafc',
        bubble: '#248bf5',
        surface: {
          DEFAULT: 'hsl(var(--surface) / <alpha-value>)',
          muted: 'hsl(var(--surface-muted) / <alpha-value>)',
        },
        line: 'hsl(var(--line) / <alpha-value>)',
        ink: 'hsl(var(--foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
      },
      boxShadow: {
        card: '0 1px 2px hsl(var(--shadow) / 0.06), 0 8px 24px -6px hsl(var(--shadow) / 0.12)',
        'card-hover': '0 2px 4px hsl(var(--shadow) / 0.06), 0 16px 32px -8px hsl(var(--shadow) / 0.18)',
        cta: '0 4px 14px -4px rgb(217 56 53 / 0.5)',
      },
    },
  },
  plugins: [],
};
