// The MIT License (MIT)
// Copyright (c) 2014 Stefan Negrea
//
// Use of this source code is governed by a MIT license that can be 
// found in the LICENSE file.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function createConnection() {
  this.connection = mongoose.createConnection(this.connectionUrl);

  this.logSchema = new Schema({
    timestamp: Schema.Types.Date,
    level: Schema.Types.String,
    message: Schema.Types.Mixed,
    stack: Schema.Types.String
  }, {
    versionKey: false
  });

  this.logSchema.index({timestamp: -1, level:-1});

  this.logModel = this.connection.model('Log', this.logSchema);
}

var MongoDBLogger = exports = module.exports = function(config) {
  this.connectionUrl = 'mongodb://' + (config.host || 'localhost') + '/' + (config.db || 'logs');
  createConnection.apply(this);
};

MongoDBLogger.prototype = {
  write: function (timestamp, levelString, level, message, stack) {
    var entry = {
      timestamp: timestamp,
      level: level,
      message: message,
      stack: stack
    };

    this.logModel.create(entry);
  },
  close: function() {
    this.connection.close();
  },
  schema: function() {
    return this.logSchema;
  },
  model: function() {
    return this.logModel;
  }
};
