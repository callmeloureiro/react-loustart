const webpack = require('webpack')
const Clean = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const baseWebpackConfig = require('./webpack.base.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = Object.assign({}, baseWebpackConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss?$/,
        use: [MiniCssExtractPlugin.loader]
      },
      ...baseWebpackConfig.module.rules
    ]
  },
  plugins: [
    new Clean([config.build.assetsRoot], {
      root: process.cwd()
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ]
})
