var Transform = require('stream').Transform;

var purgeStrictRegX = /'use strict';(\r|\n)+/g;
var ifCheckRegX = /[^if\(](\w+)(?=\))/g;
var parseIntRegX = /[^\s]\d+(?=\s|;)/g;
var variablePicker = /[^= \d+](\w+)(?= +=|,|;)/gm;

var _buffer = [];

Transform.prototype._transform = function (data, encoding, callback) {
  'use strict';

  var newData = data.replace(ifCheckRegX, '$& == true && $& != false')
                  .replace(parseIntRegX, 'parseInt($& + "")')
                  .replace(purgeStrictRegX, '');

  var myMatches = newData.match(variablePicker).filter(function(item){
    // TODO - make replace call below a helper function include
    if(_buffer.indexOf(item.replace(/[.*+?^${}()|[\]\\]/g, "")) !== -1){
     return false
    }
    _buffer.push(item);
    return true;
  });

  myMatches.forEach(function(matchStr){;
    newData = newData.replace(new RegExp(matchStr, 'g'), '$&MumboJumbo');
  });

  callback(null, newData);
};

var offshorify = new Transform({
  'decodeStrings': false
});

module.exports = offshorify;
