/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      backgroundColor: '#F6F6F6',
      cardWhite: '#FFFFFF',
      secondaryTextColor: '#CFD1D5',
      highlightBlue: '#F0F4FF',
      buttonBlue: '#4D78FF',
      searchBarBackground: "#F5F6FA"
    },
    extend: {
      // Custom scrollbar styling
      'scrollbar-thin': {
        '::-webkit-scrollbar': {
          width: '2px',
          height: '2px',
        },
        '::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#F0F4FF',
          borderRadius: '2px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#D1E4FF',
        },
      },
    },
  },
  plugins: [],
}
