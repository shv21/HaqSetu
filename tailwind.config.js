export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F0F6FB",
          100: "#EAF2F8",
          200: "#D1E3F1",
          300: "#9FBFE0",
          400: "#5D95C5",
          500: "#1B528A",
          DEFAULT: "#123B63",
          600: "#123B63",
          700: "#0E3052",
          800: "#0A243F",
          900: "#07182B",
        },
        primary: {
          DEFAULT: "#123B63",
          hover: "#0E3052",
          light: "#EAF2F8",
        },
        success: {
          DEFAULT: "#13805B",
          hover: "#0E6347",
          light: "#E7F5EE",
        },
        amber: {
          DEFAULT: "#F59E0B",
          hover: "#D97706",
          light: "#FEF3C7",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          card: "#FFFFFF",
          blue: "#EAF2F8",
        },
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
        cardHover: "0 10px 15px -3px rgba(18, 59, 99, 0.08), 0 4px 6px -4px rgba(18, 59, 99, 0.04)",
        dropdown: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
