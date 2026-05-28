import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#050b14",
        surface: "#0b1220",
        card: "#111827",
        border: "#ffffff12",
        primary: "#38bdf8",
        secondary: "#60a5fa",
        textPrimary: "#e6edf7",
        textMuted: "#94a3b8"
      },
      boxShadow: {
        cyan: "0 0 24px rgba(56, 189, 248, 0.25)",
        "cyan-strong": "0 0 40px rgba(56,189,248,0.4), 0 0 80px rgba(56,189,248,0.1)",
        card: "0 4px 20px rgba(0,0,0,0.4)",
        "card-hover": "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(56,189,248,0.1)",
        "glow-sm": "0 0 10px rgba(56,189,248,0.3)",
        "glow-md": "0 0 20px rgba(56,189,248,0.4)",
        "glow-lg": "0 0 40px rgba(56,189,248,0.3), 0 0 80px rgba(56,189,248,0.1)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(56,189,248,0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(56,189,248,0.6)" }
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards"
      },
    }
  },
  plugins: []
};

export default config;
