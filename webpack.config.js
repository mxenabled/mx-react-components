var path = require('path');
var webpack = require('webpack');

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
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-assign']
        }
      }
    ],
    noParse: [/autoit.js/]
  },
  output: {
    filename: './bundle.js'
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ],
  resolve: {
    alias: {
      components: path.join(__dirname, 'components')
    }
  }
};