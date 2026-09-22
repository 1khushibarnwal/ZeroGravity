/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14121F",
          soft: "#1B1830",
          surface: "#211D38",
          line: "#332C54",
        },
        parchment: {
          DEFAULT: "#F1EDE4",
          dim: "#B8B2CC",
          faint: "#8B85A3",
        },
        veil: {
          DEFAULT: "#6E5BA6",
          bright: "#9884D6",
        },
        brass: {
          DEFAULT: "#E8B34C",
          dim: "#B98C36",
        },
        signal: {
          good: "#6FBF8B",
          bad: "#D9727A",
          wait: "#7A9CC6",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "reveal-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(232,179,76,0.14) 0%, rgba(232,179,76,0) 70%)",
      },
    },
  },
  plugins: [],
};
