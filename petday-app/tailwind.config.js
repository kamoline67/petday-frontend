/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5ED',
          100: '#FFE8D6',
          200: '#FFD5B3',
          300: '#FFBC8A',
          400: '#FF924C',
          500: '#FF7716',
          600: '#E05C00',
          700: '#B84500',
          800: '#943500',
          900: '#7A2C00',
        },
        secondary: {
          50: '#f8f6f5',
          100: '#f0ece9',
          200: '#e0d9d3',
          300: '#d0c6bd',
          400: '#c0b3a7',
          500: '#1b100aff',
          600: '#371E12',
          700: '#2C180E',
          800: '#24130B',
          900: '#1D0F09',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#FDFDFD',
          100: '#F9F9F9',
          200: '#F2F2F2',
          300: '#EBEBEB',
          400: '#E5E5E5',
          500: '#EFEFEE',
          600: '#D9D9D8',
          700: '#BFBFBE',
          800: '#8C8C8B',
          900: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.1' }],
        'display-md': ['3.5rem', { lineHeight: '1.1' }],
        'display-sm': ['2.5rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}