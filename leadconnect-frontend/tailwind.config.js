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
        highlightBlue: '#F0F4FF',
        buttonBlue: '#4D78FF',
        searchBarBackground: "#F5F6FA",
        iconColor: "#767B86",
        hoverIconColor: "#DCDCDC"
      },
    extend: {},
  },
  plugins: [],
}

