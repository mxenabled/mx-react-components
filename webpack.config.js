var path = require('path');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015", "react"],
          plugins: ["transform-object-assign"]
        }
      }
    ]
  },
  plugins: [],
  resolve: {
    alias: {
      components: path.join(__dirname, 'src/components'),
      constants: path.join(__dirname, 'src/constants'),
      utils: path.join(__dirname, 'src/utils')
    }
  }
};