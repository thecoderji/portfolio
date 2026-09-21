import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F6F1E7",
          deep: "#EFE8DA",
          card: "#FBF8F1",
        },
        ink: {
          DEFAULT: "#191512",
          soft: "#4A423B",
        },
        vermilion: "#D9442B",
        cobalt: "#1E4FD8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-grotesk)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        card: "4px 4px 0 0 rgba(25, 21, 18, 0.9)",
        "card-sm": "2px 2px 0 0 rgba(25, 21, 18, 0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
