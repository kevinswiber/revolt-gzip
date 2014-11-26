# revolt-gzip

GZip compression support for [revolt](https://github.com/kevinswiber/revolt).

## Install

```
npm install revolt-gzip
```

## Example

```js
var revolt = require('revolt');
var gzip = require('revolt-gzip');

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

```

## License

MIT
