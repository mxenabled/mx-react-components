/* eslint-disable no-process-env */
const path = require('path');

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {
  devServer: {
    host: '0.0.0.0',
    hot: true,
    inline: true,
    open: true,
    port: 8080,
    progress: true
  },
  devtool: !isProd && 'eval',
  entry: {
    app: ['./docs/app.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      }
    ],
    noParse: [/autoit.js/]
  },
  output: {
    filename: '../docs/bundle.js'
  },
  resolve: {
    alias: {
      components: path.join(__dirname, './docs/components'),
      'mx-react-components': path.join(__dirname, './src'),
      utils: path.join(__dirname, './src/utils')
    }
  }
};
