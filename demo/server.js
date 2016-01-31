var liveServer = require('live-server');

var params = {
  port: 8081
  root: './demo' // Set root directory that's being server. Defaults to cwd.
};

liveServer.start(params);