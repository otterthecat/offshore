'use strict';
var Transform = require('stream').Transform;

var ifCheckRegX = /[^if\(](\w+)(?=\))/g;
var parseIntRegX = /[^\s]\d+(?=\s|;)/g;

Transform.prototype._transform = function(data, encoding, callback){
  var newData = data.replace(ifCheckRegX, '$& == true && $& != false');
  newData = newData.replace(parseIntRegX, 'parseInt($& + "")');
  callback(null, newData);
};

var offshorify = new Transform({
  "decodeStrings": false
});

module.exports = offshorify;
