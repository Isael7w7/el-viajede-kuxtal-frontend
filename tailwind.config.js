/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kuxtalVerde: '#4CAF50',
        kuxtalTurquesa: '#26A69A',
        kuxtalAzulSerenidad: '#5C9EED',
        kuxtalArena: '#F4E9D8',
        kuxtalNiebla: '#FAFAFA',
        kuxtalAnsiedad: '#7DA7D9',
      },
      fontFamily: {
        titulo: ['Poppins', 'sans-serif'],
        cuerpo: ['Nunito Sans', 'sans-serif'],
      },
      screens: {
        'celular': '360px',
        'tablet': '600px',
        'laptop': '1024px',
        'desktop': '1440px',
      },
    },
  },
  plugins: [],
}