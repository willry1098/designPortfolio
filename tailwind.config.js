/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'deep-indigo': 'rgb(28, 28, 69)',
        'soft-white': 'rgb(245, 245, 250)',
        'signal-blue': 'rgb(72, 120, 255)',
        // Secondary Colors
        'slate-gray': 'rgb(96, 105, 130)',
        'tech-teal': 'rgb(0, 175, 175)',
        'warm-sand': 'rgb(220, 190, 160)',
      },
    },
  },
  plugins: [],
};
