/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        black: '#0f0f0f',
        white: '#fafafa',
        primary: '#cfa800',
        secondary: '#0096FF',
        background: '#18181B'
      }
    }
  },
  plugins: [require('tailwindcss-dotted-background')]
}
