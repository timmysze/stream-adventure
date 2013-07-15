var http = require('http');
var through = require('through');

var th = through(function (buf) {
  this.queue(buf.toString().toUpperCase());
});

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(th).pipe(res);
  } else {
    res.end('send me a POST\n');
  }
});

server.listen(8000);
