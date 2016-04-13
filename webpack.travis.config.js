var config = require('./webpack.config.js');

config.plugins.push(function () {
  this.plugin('done', function (stats) {
    if (stats.compilation.errors && stats.compilation.errors.length) {
      console.log('Found following error(s):');

      stats.compilation.errors.forEach(function (response) {
        console.log(response.error);
      });

      process.exit(1);
    }
  });
});

module.exports = config;