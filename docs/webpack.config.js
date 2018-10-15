/* eslint-disable no-process-env */
const path = require('path');
const webpack = require('webpack');

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {
  devServer: {
    host: '0.0.0.0',
    open: true,
    port: 8080,
    progress: true
  },
  devtool: !isProd && 'eval-source-map',
  entry: {
    app: './app.js'
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
              presets: ['@babel/env', '@babel/react'],
            }
          }
        ]
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
  ],
  resolve: {
    alias: {
      components: path.join(__dirname, './components'),
      'mx-react-components': path.join(__dirname, '../src'),
      utils: path.join(__dirname, '../src/utils')
    }
  }
};
