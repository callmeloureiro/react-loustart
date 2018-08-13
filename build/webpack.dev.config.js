const path = require('path')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

Object.keys(baseWebpackConfig.entry).forEach(name => {
  baseWebpackConfig.entry[name] = [
    `webpack-dev-server/client?http://127.0.0.1:${baseWebpackConfig.devServer.port}`,
    'webpack/hot/only-dev-server'
  ].concat(baseWebpackConfig.entry[name])
})

module.exports = Object.assign({}, baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.s?[ac]ss?$/,
        use: [
          {
            loader: 'style-loader'
          }
        ]
      },
      ...baseWebpackConfig.module.rules
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true
    })
  ]
})
