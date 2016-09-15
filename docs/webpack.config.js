var path = require('path');
var webpack = require('webpack');

var isProd = (process.env.NODE_ENV === 'production');

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
  plugins:function () {
    var plugins = []

    plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }));

    if (isProd) {
      // Production specific plugins
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output: {
          comments: false //Removes comments from minified files
        },
        sourceMap: false //Source maps are slow and unwanted
      }));
    }

    return plugins;
  }(),
  resolve: {
    alias: {
      components: path.join(__dirname, 'components'),
      'mx-react-components': path.join(__dirname, '../src')
    }
  }
};
