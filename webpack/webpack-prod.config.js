const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', './src/scripts/index.js'],
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname)
  },
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin()
  ]
}
