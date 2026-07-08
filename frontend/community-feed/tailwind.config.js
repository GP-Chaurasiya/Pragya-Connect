/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EAF3F4',
          100: '#D5EBEC',
          200: '#AACCCF',
          300: '#7FA2A6',
          400: '#547B80',
          500: '#0B525B', // Core Brand Primary
          600: '#09434A',
          700: '#07343A',
          800: '#05252A',
          900: '#03161A',
        },
        accent: {
          50: '#FEF6EC',
          100: '#FDECD6',
          200: '#FBD39D',
          300: '#F8B964',
          400: '#F6A02B',
          500: '#EBA036', // Core Brand Accent
          600: '#BC802B',
          700: '#8D6020',
          800: '#5E4015',
          900: '#2F200B',
        }
      },
    },
  },
  plugins: [],
}
