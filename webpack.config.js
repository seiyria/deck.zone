var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry:  {
    bootstrap: './bootstrap.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /ng2-(ace|sweetalert2|fontawesome)\/index\.js$/,
        loaders: ['babel-loader']
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loader: 'style!css'
      },
      {
        test: /\.less/,
        loader: 'style!css!less'
      },
      {
        test: /\.json/,
        loader: 'json'
      },
      {
        test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
        loader: 'file'
      },
      {
        test: /\.html/,
        loader: 'html'
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
};