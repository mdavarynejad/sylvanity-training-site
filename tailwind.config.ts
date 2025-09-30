/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-sage': 'rgb(var(--color-brand-primary) / <alpha-value>)',
        'brand-blue': 'rgb(var(--color-brand-secondary) / <alpha-value>)',
        'brand-tertiary': 'rgb(var(--color-brand-tertiary) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}