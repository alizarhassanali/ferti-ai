import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'SF Pro', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Core Design System
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Brand Colors - CNP Palette
        "brand-navy": "hsl(var(--brand-navy))",
        "brand-coral": "hsl(var(--brand-coral))",
        "brand-lavender": "hsl(var(--brand-lavender))",
        "brand-blush": "hsl(var(--brand-blush))",
        
        // Neutral Warm Scale
        "neutral-warm": {
          50: "hsl(var(--neutral-warm-50))",
          100: "hsl(var(--neutral-warm-100))",
          200: "hsl(var(--neutral-warm-200))",
        },
        
        // Neutral Blue Scale
        "neutral-blue": {
          50: "hsl(var(--neutral-blue-50))",
          100: "hsl(var(--neutral-blue-100))",
          200: "hsl(var(--neutral-blue-200))",
        },
        
        // Primary (Coral)
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
        },
        
        // Brand (Navy)
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
        
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          light: "hsl(var(--success-light))",
        },
        
        warning: {
          DEFAULT: "hsl(var(--warning-yellow))",
        },
        
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        nav: {
          DEFAULT: "hsl(var(--nav-background))",
          border: "hsl(var(--nav-border))",
          active: "hsl(var(--nav-active))",
          hover: "hsl(var(--nav-hover))",
        },
        
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'cnp-sm': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'cnp-md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'cnp-lg': '0 12px 32px rgba(0, 0, 0, 0.12)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 32px rgba(0, 0, 0, 0.12)',
        'pill': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'input': 'inset 0 1px 2px rgba(0, 0, 0, 0.06)',
        'input-focus': '0 0 0 3px rgba(36, 62, 99, 0.15)',
        'modal': '0 12px 32px rgba(0, 0, 0, 0.12)',
        'sidebar': '2px 0 12px rgba(0, 0, 0, 0.04)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "card-lift": {
          "0%": {
            transform: "translateY(0)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          },
          "100%": {
            transform: "translateY(-3px)",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "card-lift": "card-lift 0.2s ease-out forwards",
        "fade-in": "fade-in 0.25s ease-out",
        "slide-in": "slide-in 0.25s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
