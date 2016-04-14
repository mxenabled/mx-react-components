var path = require('path');

module.exports = {
  entry: {
    app: './app.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: /components/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ],
    noParse: [/autoit.js/]
  },
  output: {
    filename: './bundle.js'
  },
  resolve: {
    alias: {
      components: path.join(__dirname, 'components')
    }
  }
};