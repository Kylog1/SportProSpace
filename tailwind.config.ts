import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          50: "#f0f4fa",
          100: "#dbe5f1",
          200: "#b8cae3",
          300: "#8aa6cd",
          400: "#5e80b3",
          500: "#3f6398",
          600: "#314e7e",
          700: "#293f66",
          800: "#1e3a8a",
          900: "#172554",
          950: "#0b1736",
        },
        // Dark hero + header palette. Namespaced on purpose: navy-*, primary,
        // accent and the shadcn tokens stay untouched. Data colours carry
        // meaning (see DESIGN.md, "Hero and header"): do not use them as
        // decoration outside the hero.
        space: {
          bg: "#040b1c", // the night sky: hero and header background
          glow: "#0a1e4a",
          ink: "#eaf1ff", // text on the dark surface
          "ink-2": "#9db0d3", // secondary text on the dark surface
          blue: "#0b5bd3", // primary button fill
          "blue-hi": "#3b8cff", // button border, third headline sentence
          cyan: "#7fe6ff", // Commercial Score, LED boards, padel/tennis court
          coral: "#ff7a59", // detractors, churn, exits
          promoter: "#9cc8ff", // promoters, NPS
          passive: "#4b6ba6", // passives
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Hero + header only. `font-display` stays an alias of Inter.
        hero: ["var(--font-archivo)", '"Arial Black"', "Arial", "sans-serif"],
        hud: [
          "var(--font-martian)",
          "ui-monospace",
          '"Cascadia Mono"',
          "Consolas",
          "monospace",
        ],
        "hero-body": ["var(--font-instrument)", "system-ui", '"Segoe UI"', "sans-serif"],
      },
      spacing: {
        // Side gutter shared by the header and the hero (see --hero-gutter).
        gutter: "var(--hero-gutter)",
      },
      letterSpacing: {
        "tightest": "-0.04em",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, white 80%), linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
