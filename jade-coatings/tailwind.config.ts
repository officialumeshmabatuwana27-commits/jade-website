import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jade: {
          50: "#f0fbf5",
          100: "#dcf6e7",
          200: "#b9edd0",
          300: "#84dfae",
          400: "#3ec682",
          500: "#00A651",
          600: "#008842",
          700: "#006c36",
          800: "#06552c",
          900: "#074626",
          950: "#012713",
        },
        "jade-light": "#00C360",
        "jade-pale": "#EBF8F2",
        "earth-brown": "#5C4033",
        cream: "#FAFCFA",
        charcoal: "#231F20",
        "dark-bg": "#0B0F17",
        "dark-card": "#151D2A",
        "dark-border": "#1E293B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-heading)", "Manrope", "Inter", "sans-serif"],
        display: ["var(--font-heading)", "Manrope", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "jade-gradient":
          "linear-gradient(135deg, #1A2E23 0%, #2E7D4F 50%, #4CAF80 100%)",
        "jade-radial":
          "radial-gradient(ellipse at top left, #2E7D4F 0%, #1A2E23 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
