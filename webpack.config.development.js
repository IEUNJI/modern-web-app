const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.config.common');

const webpack = require('webpack');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();

const config = merge(commonWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      env: JSON.stringify('development')
    })
  ],
  devServer: {
    port: 8080,
    compress: true,
    proxy: {
      
    }
  },
  devtool: 'cheap-module-eval-source-map'
});

module.exports = smp.wrap(config);
