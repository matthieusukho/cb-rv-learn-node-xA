// The MIT License (MIT)
// Copyright (c) 2014 Stefan Negrea
//
// Use of this source code is governed by a MIT license that can be 
// found in the LICENSE file.

var NullLogger = exports = module.exports = function(config) {
  // no-op
};

NullLogger.prototype = {
  write: function(timestamp, levelString, level, message, stack) {
    // GULP!! GIMME MORE!
  },
  close: function() {
    // no-op
  }
};
