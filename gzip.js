var zlib = require('zlib');

module.exports = function(handle) {
  handle('request', function(pipeline) {
    return pipeline.map(function(env) {
      if (!has(env.request.headers, 'accept-encoding')) {
        env.request.headers['accept-encoding'] = 'gzip';
      }

      return env;
    });
  });

  handle('response', function(pipeline) {
    return pipeline.map(function(env) {
      var encoding = env.response.headers['content-encoding'];

      if (encoding && encoding.toLowerCase() === 'gzip' && env.response.body) {
        var unzipStream = zlib.createGunzip();
        env.response.body = env.response.body.pipe(unzipStream);
      }

      return env;
    });
  });
};

function has(obj, name) {
  if (typeof obj !== 'object') {
    return false;
  }

  var keys = Object.keys(obj);
  var name = name.toLowerCase();

  for(var i = 0; i < keys.length; i++) {
    if (keys[i].toLowerCase() === name) {
      return keys[i];
    }
  };

  return false;
}
