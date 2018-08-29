const path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, '../build/index.html'),
    assetsRoot: path.resolve(__dirname, '../build'),
    assetsPublicPath: '/'
  },
  dev: {
    port: 8080,
    assetsPublicPath: '/'
  }
}
