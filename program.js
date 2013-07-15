var through = require('through');
var split = require('split');
var lineCount = 0;
var write = function (line) {
  var line = line.toString();
  this.queue(lineCount % 2 === 0
      ? line.toLowerCase() + '\n'
      : line.toUpperCase() + '\n'
  );
  lineCount ++;
};

var end = function () {
  this.queue(null);
};

var tr = through(write, end);

process.stdin
  .pipe(split())
  .pipe(tr)
  .pipe(process.stdout);
