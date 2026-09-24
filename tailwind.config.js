/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // UBQ brand
        orange: "#ff6700", purple: "#9800a8", blue: "#002582", green: "#39b54a", gravel: "#484649",
        // Calm, Tebra-like working palette built on the brand
        ink: "#0b1846",          // headings (deep resolution blue)
        body: "#3a3f55",
        "body-muted": "#6b7088",
        canvas: "#ffffff",
        cream: "#fbf8f4",        // warm page background
        sand: "#f5efe7",
        lavender: "#f3f1fb",     // soft tinted panels
        "lavender-2": "#e9e5f8",
        peach: "#fff2e8",
        mint: "#eaf7ec",
        sky: "#eef3ff",
        hairline: "#e8e6ef",
        "line-strong": "#d5d2e2",
        "orange-deep": "#e85d00",
      },
      fontFamily: {
        display: ["var(--font-display)", "Montserrat", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "Roboto", "Arial", "sans-serif"],
      },
      borderRadius: { sm: "6px", md: "10px", lg: "16px", xl: "22px", "2xl": "28px", "3xl": "36px", pill: "999px" },
      boxShadow: {
        card: "0 1px 2px rgba(11,24,70,.04), 0 12px 32px -12px rgba(11,24,70,.14)",
        "card-hover": "0 2px 4px rgba(11,24,70,.05), 0 24px 48px -16px rgba(11,24,70,.22)",
        float: "0 18px 40px -12px rgba(11,24,70,.28)",
        bold: "0 10px 30px -10px rgba(11,24,70,.25)",
      },
      maxWidth: { container: "1240px", prose: "720px" },
      transitionTimingFunction: { zen: "cubic-bezier(0.22, 1, 0.36, 1)" },
      transitionDuration: { fast: "150ms", base: "300ms", slow: "900ms" },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg,#ff6700 0%,#9800a8 55%,#002582 100%)",
        "hero-gradient": "radial-gradient(120% 90% at 85% 0%, #1b2a78 0%, #0b1846 60%, #081236 100%)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(14px)" }, "100%": { opacity: "1", transform: "none" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        floatb: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(7px)" } },
        pulsering: { "0%": { boxShadow: "0 0 0 0 rgba(255,103,0,.45)" }, "100%": { boxShadow: "0 0 0 10px rgba(255,103,0,0)" } },
        typing: { "0%,80%,100%": { opacity: ".25" }, "40%": { opacity: "1" } },
        spinslow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.22,1,.36,1) both",
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        floatb: "floatb 7s ease-in-out infinite",
        pulsering: "pulsering 1.8s ease-out infinite",
        spinslow: "spinslow 40s linear infinite",
      },
    },
  },
  plugins: [],
};
