var zlib = require('zlib');

module.exports = function(handle) {
  handle('request', function(env, next) {
    if (!has(env.options.headers, 'accept-encoding')) {
      env.options.headers['accept-encoding'] = 'gzip';
    }

    next(env);
  });

  handle('response', function(env, next) {
    var encoding = env.response.headers['content-encoding'];

    if (encoding && encoding.toLowerCase() === 'gzip') {
      var unzipStream = zlib.createGunzip();
      env.response.body = env.response.body.pipe(unzipStream);
    }

    next(env);
  });
};

function has(obj, name) {
  var keys = Object.keys(obj);
  var name = name.toLowerCase();

  for(var i = 0; i < keys.length; i++) {
    if (keys[i].toLowerCase() === name) {
      return keys[i];
    }
  };

  return false;
}
