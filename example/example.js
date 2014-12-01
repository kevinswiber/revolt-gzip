var argo = require('argo');
var revolt = require('revolt');
var gzip = require('../gzip');

// server
argo()
  .use(require('argo-gzip'))
  .get('/', function(handle) {
    handle('request', function(env, next) {
      env.response.body = 'Hello world';
      next(env);
    });
  })
  .listen(3002);

// client
var client = revolt()
  .use(gzip);

client
  .get('http://localhost:3002')
  .flatMap(function(env) {
    return revolt.buffer(env.response.body);
  })
  .subscribe(function(data) {
    console.log(data.toString());
  });

