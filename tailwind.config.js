module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./features/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#611f69',
        'primary-dark': '#4a0e4e',
        'secondary': '#1264a3',
        'success': '#007a5a',
        'danger': '#e01e5a',
        'dark': '#1a1d21',
        'darker': '#0d0e10',
        'light': '#f8f9fa',
        'border': '#3f4447',
        'text-primary': '#1d1c1d',
        'text-secondary': '#616061',
        'text-light': '#d1d2d3',
      },
      fontFamily: {
        'sans': ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
  important: true,
}