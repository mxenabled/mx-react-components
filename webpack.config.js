/* eslint-disable no-process-env */
const path = require('path');

module.exports = {
  devServer: {
    host: '0.0.0.0',
    hot: true,
    inline: true,
    open: true,
    port: 8080,
    progress: true
  },
  devtool: 'eval',
  entry: {
    app: ['@babel/polyfill', './docs/app.js']
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
            options: {
              plugins: [
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-transform-object-assign',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties'
              ],
              presets: ['@babel/env', '@babel/react']
            }
          }
        ]
      }
    ],
    noParse: [/autoit.js/]
  },
  output: {
    filename: './docs/bundle.js'
  },
  resolve: {
    alias: {
      components: path.join(__dirname, './docs/components'),
      'mx-react-components': path.join(__dirname, './src'),
      utils: path.join(__dirname, './src/utils')
    }
  }
};
