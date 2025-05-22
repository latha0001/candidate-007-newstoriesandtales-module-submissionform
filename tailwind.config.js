/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Merriweather', 'serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'paper-texture': "url('https://images.pexels.com/photos/4119736/pexels-photo-4119736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
    },
  },
  plugins: [],
};