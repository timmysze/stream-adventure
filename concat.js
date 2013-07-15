var concat = require('concat-stream');

var ct = concat(function (body) {
  var output = '';
  body = body.toString();
  for (var i = 1; i < body.length; i++) {
    output += body[body.length - i];
  }
  console.log(output);
});

process.stdin
  .pipe(ct);
