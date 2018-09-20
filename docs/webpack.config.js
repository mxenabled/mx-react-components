/* eslint-disable no-process-env */
const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'eval',
  entry: {
    app: ['@babel/polyfill', './app.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /components/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/react', '@babel/env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties']
        }
      }
    ],
    noParse: [/autoit.js/]
  },
  output: {
    filename: './bundle.js'
  },
  resolve: {
    alias: {
      components: path.join(__dirname, 'components'),
      'mx-react-components': path.join(__dirname, '../src'),
      utils: path.join(__dirname, '../src/utils')
    }
  }
};
