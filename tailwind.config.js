module.exports = {
  content: [
    "./components/**/*.{js,html}",
    "./index.html",
    "./detail/**/*.{js,html}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: [],
} 