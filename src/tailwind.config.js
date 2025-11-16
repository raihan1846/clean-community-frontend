// tailwind.config.js
module.exports = {
    darkMode: 'class', // এটি যোগ করুন
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
  }