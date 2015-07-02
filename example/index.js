var fs = require('fs');
var offshore = require('../src/offshore');

 var readStream = fs.createReadStream('source.js', {
  'encoding': 'utf8'
});
var writeStream = fs.createWriteStream('done.js');

readStream
  .pipe(offshore)
  .pipe(writeStream);
