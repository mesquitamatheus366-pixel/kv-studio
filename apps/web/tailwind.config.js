/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Acento kv.studio = laranja
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        // Status (bolinhas)
        status: {
          producao: "#9ca3af",       // cinza
          editado: "#f59e0b",        // laranja
          aprovado: "#22c55e",       // verde
          revisado: "#fbcfe8",       // rosa claro
          ajuste: "#ec4899",         // rosa choque
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
