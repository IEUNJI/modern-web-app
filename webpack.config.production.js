const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.config.common');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();

const config = merge(commonWebpackConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
    new BundleAnalyzerPlugin ()
  ],
  devtool: 'source-map'
});

module.exports = smp.wrap(config);
