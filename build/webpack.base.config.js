const path = require('path')
const config = require('./config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/app.js']
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: isProd
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    stats: { colors: true },
    port: config.dev.port,
    publicPath: config.dev.assetsPublicPath,
    noInfo: false,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: path.resolve('./.eslintrc')
            }
          }
        ]
      },
      {
        test: /\.s?[ac]ss?$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:6]',
              minimize: { safe: true }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: 'file-loader?name=[name].[ext]'
          }
        ]
      }
    ]
  }
}
