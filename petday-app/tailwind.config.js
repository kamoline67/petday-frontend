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
          50:  '#FFF4E9',
          100: '#FFE6CC',
          200: '#FFCC99',
          300: '#FFB266',
          400: '#FF9833',
          500: '#FF7C1F', // laranja principal (igual sua onda)
          600: '#E66F1B',
          700: '#CC6218',
          800: '#B35514',
          900: '#8C4210',
        },

        dark: {
          50:  '#F5F5F5',
          100: '#E1E1E1',
          200: '#CFCFCF',
          300: '#B1B1B1',
          400: '#9E9E9E',
          500: '#7E7E7E',
          600: '#555555',
          700: '#2E2E2E',
          800: '#1A1A1A',
          900: '#0D0D0D', // preto ideal para fundo
        },

        light: {
          50:  '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#F0F0F0',
          400: '#E5E5E5',
          500: '#DCDCDC',
          600: '#CFCFCF',
          700: '#BFBFBF',
          800: '#AFAFAF',
          900: '#9A9A9A',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Raleway', 'system-ui', 'sans-serif'],
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