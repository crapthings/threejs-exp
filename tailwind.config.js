module.exports = {
  content: [
    './src/**/*.{html,js}'
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        desktop: '1920px',
      },
      aspectRatio: {
        '21/9': '21 / 9',
        '32/9': '32 / 9',
      },
    },
  },
  plugins: [
    // require('daisyui')
  ],
}
