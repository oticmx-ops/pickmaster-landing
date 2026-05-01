import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#06080F",
        surface: "#0E1322",
        "surface-elevated": "#151B2E",
        primary: "#4F7FFF",
        accent: "#3B6FF5",
        "text-primary": "#FFFFFF",
        "text-secondary": "#9AA3B2",
        border: "#1A2035",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "dot-pattern": "radial-gradient(circle, #1A2035 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,127,255,0.15), transparent)",
        "blue-glow":
          "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(79,127,255,0.12), transparent)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "gradient-shift": "gradientShift 6s ease infinite",
        "fade-float": "fadeFloat 5s ease-in-out infinite",
        "pulse-ring": "pulseRing 2s ease-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeFloat: {
          "0%, 100%": { opacity: "0", transform: "translateY(8px)" },
          "20%, 80%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.6)", opacity: "0.5" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(79,127,255,0.25)",
        "glow-blue-lg": "0 0 80px rgba(79,127,255,0.2)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover":
          "0 18px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(79,127,255,0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
