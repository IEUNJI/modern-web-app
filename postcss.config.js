module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      unitPrecision: 5,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      minPixelValue: 1,
      exclude: /node_modules/,
      landscape: true,
      landscapeUnit: 'vw',
      landscapeWidth: 667
    }
  }
};
