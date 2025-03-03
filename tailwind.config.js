/* @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#006DE1',
          50: '#E6F1FD',
          100: '#CCE3FB',
          200: '#99C7F7',
          300: '#66ABF3',
          400: '#338FEF',
          500: '#006DE1',
          600: '#0057B4',
          700: '#004187',
          800: '#002C5A',
          900: '#00162D',
        },
        secondary: {
          DEFAULT: '#4F20D2',
          50: '#EEE8FA',
          100: '#DDD1F5',
          200: '#BBA3EB',
          300: '#9975E1',
          400: '#7747D7',
          500: '#4F20D2',
          600: '#3F1AA8',
          700: '#2F137E',
          800: '#200D54',
          900: '#10062A',
        },
      },
      boxShadow: {
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #006DE1 0%, #4F20D2 100%)',
      }
    },
  },
  plugins: [],
};