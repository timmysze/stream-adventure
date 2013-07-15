var tar = require('tar');
var zlib = require('zlib');
var through = require('through');
var crypto = require('crypto');

var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);
var unzipper = zlib.createGunzip();
// var hasher = crypto.createHash('md5', { encoding: 'hex' });
var parser = tar.Parse();

parser.on('entry', function (e) {
  if (e.type === 'File') {
    // console.log(e.type);
    e.pipe(crypto.createHash('md5', { encoding: 'hex' }))
      .pipe(through(function (hash) {
        // console.log(hash)
        this.queue(hash + ' ' + e.path + '\n');
      }))
      .pipe(process.stdout);
  }
});

process.stdin
  .pipe(decipher)
  .pipe(unzipper)
  .pipe(parser);
