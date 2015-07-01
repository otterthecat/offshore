'use strict';
var fs = require('fs');
var path = require('path');
var Transform = require('stream').Transform;

Transform.prototype._transform = function(data, encoding, callback){
  var regex = /[^if\(](\w+)(?=\))/g;
  var newData = data.replace(regex, '$& == true && $& != false');
  callback(null, newData);
};
var offshorify = new Transform({
  'decodeStrings': false
});

module.exports = function(source, destination){

  var readStream = fs.createReadStream(source, {
    'encoding': 'utf8'
  });
  var writeStream = fs.createWriteStream(destination);

  readStream.pipe(offshorify).pipe(writeStream);
};
