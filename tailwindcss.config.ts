// tailwind.config.ts
import { type Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./layouts/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        amharic: ["var(--font-noto-ethiopic)", "system-ui", "sans-serif"],
        mono: ["var(--font-fira-mono)", "monospace"],
      },

      colors: {
        // App Background Level 0
        background: {
          DEFAULT: "#F8FAFC",
          subtle: "#F1F5F9",
        },
        // Cards & Containers Level 1
        card: {
          DEFAULT: "#FFFFFF",
          hover: "#FFFFFF",
        },
        // Primary Brand Color
        primary: {
          DEFAULT: "#247BA0",
          50: "#F0F8FC",
          100: "#E0F1F8",
          200: "#B8E0F0",
          300: "#8CCEE8",
          400: "#60BCDF",
          500: "#247BA0",
          600: "#1D6280",
          700: "#164A60",
          800: "#0E3140",
          900: "#071920",
        },
        // Sidebar Colors
        sidebar: {
          bg: "#F1F5F9",
          text: "#1E293B",
          hover: "#E8F1F2",
          active: "#3E5C76",
          "active-text": "#FFFFFF",
          icon: "#64748B",
          "icon-active": "#FFFFFF",
          indicator: "#247BA0",
        },
        // Text Colors
        text: {
          primary: "#1E293B",
          secondary: "#64748B",
          muted: "#94A3B8",
          white: "#FFFFFF",
        },
        // Status Colors
        error: {
          DEFAULT: "#EF4444",
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        success: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        warning: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        // Border
        border: {
          DEFAULT: "#E2E8F0",
          light: "#F1F5F9",
        },
      },

      // Custom Gradients
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #247BA0 0%, #60BCDF 100%)",
        "gradient-sidebar-active": "linear-gradient(90deg, #3E5C76 0%, #577399 100%)",
      },

      // Custom Shadows
      boxShadow: {
        "card": "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
        "dropdown": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
        "modal": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        "active-indicator": "inset 0 0 0 1px #247BA0, inset 0 0 0 2px rgba(36, 123, 160, 0.1)",
      },

      // Border Radius
      borderRadius: {
        "card": "0.75rem",
        "sidebar": "0.5rem",
        "button": "0.5rem",
      },

      // Animations
      animation: {
        "fade-in": "fadeIn 0.2s ease-in-out",
        "slide-in": "slideIn 0.2s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },

      // Spacing
      spacing: {
        "sidebar": "16rem",
        "sidebar-collapsed": "5rem",
      },
    },
  },
  plugins: [forms, typography, aspectRatio],
};

export default config;