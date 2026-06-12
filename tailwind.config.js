export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#e9f7f4",
          DEFAULT: "#0f5561",
          dark: "#0a3f4a",
        },
        primary: "#0f766e",
        "primary-hover": "#115e59",
      },
      boxShadow: {
        soft: "0 20px 45px rgba(15, 85, 97, 0.08)",
      },
    },
  },
  plugins: [],
};
