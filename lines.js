var split = require('split');
var through = require('through');

var counter = 1;

var tr = through(function (line) {
  if (counter % 2 === 0) {
    this.queue(line.toString().toUpperCase() + '\n');
  } else {
    this.queue(line.toString().toLowerCase() + '\n');
  }
  counter++;
});

process.stdin
  .pipe(split())
  .pipe(tr)
  .pipe(process.stdout);
