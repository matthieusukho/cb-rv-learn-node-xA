// The MIT License (MIT)
// Copyright (c) 2014 Stefan Negrea
//
// Use of this source code is governed by a MIT license that can be 
// found in the LICENSE file.

var ConsoleLogger = exports = module.exports = function(config) {
  // no-op
};

ConsoleLogger.prototype = {
  write: function(timestamp, levelString, level, message, stack) {
    console.log(levelString, timestamp.toISOString(), message || '', stack || '');
  },
  close: function() {
    // no-op
  }
};
