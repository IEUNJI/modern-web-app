const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();

module.exports = env => {
  const isDev = env.development;

  const config = {
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].[contenthash:6].bundle.js',
      chunkFilename: 'js/[name].[contenthash:6].chunk.js'
    },
    resolve: {
      alias: {
        'assets': path.resolve(__dirname, './src/assets'),
        'pages': path.resolve(__dirname, './src/pages'),
        'routes': path.resolve(__dirname, './src/routes'),
        'utils': path.resolve(__dirname, './src/utils')
      },
      extensions: ['.js', '.jsx']
    },
    devServer: {
      port: 8080,
      compress: true,
      contentBase: path.resolve(__dirname, './dist')
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader?cacheDirectory',
          exclude: /node_modules/
        },
        {
          test: /\.(css|less)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              outputPath: 'assets'
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:6].css'
      }),
      !isDev && new BundleAnalyzerPlugin()
    ].filter(Boolean),
    optimization: {
      minimizer: [
        !isDev && new TerserJSPlugin(),
        !isDev && new OptimizeCSSAssetsPlugin()
      ].filter(Boolean),
      usedExports: true,
      splitChunks: {
        chunks: 'initial',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  };

  return smp.wrap(config);
};
