// The MIT License (MIT)
// Copyright (c) 2014 Stefan Negrea
//
// Use of this source code is governed by a MIT license that can be 
// found in the LICENSE file.

var fmt = require('util').format;

var Logger = exports = module.exports = function Logger(config) {
  var level = config.level;

  if (typeof level == 'string') {
    level = exports.level[level.toUpperCase()];
  }

  this.level = isFinite(level) ? level : this.DEBUG;
  this.loggers = {};

  for (var loggerName in config.loggers) {
    var loggerConfig = config.loggers[loggerName];
    var LoggerClass = exports.loggers[loggerName];

    if (LoggerClass) {
      var enabled = true;
      if (typeof loggerConfig === 'boolean') {
        enabled = loggerConfig;
        loggerConfig = {};
      }

      if (enabled) {
        this.loggers[loggerName] = new LoggerClass(loggerConfig);
      }
    }
  }

  if (this.loggers.length === 0) {
    this.loggers.push(new exports.loggers.console());
  }
};

exports.loggers = {
  'null': require('./null'),
  'console': require('./console'),
  mongodb: require('./mongodb')
};

exports.level = {
  EMERGENCY: 0,
  ALERT: 1,
  CRITICAL: 2,
  ERROR: 3,
  WARNING: 4,
  NOTICE: 5,
  INFO: 6,
  DEBUG: 7
};

Logger.prototype = {
  log: function(levelStr, args) {
    var stack = undefined;
    if (exports.level[levelStr] <= exports.level.ERROR) {
      if (args && args.length > 0) {
        Object.keys(args).some(function(argKey) {
          var arg = args[argKey];
          if (arg instanceof Error && arg.stack) {
            stack = arg.stack;
            return true;
          }
          return false;
        });
      }

      if (!stack) {
        stack = new Error().stack;
      }
    }

    setImmediate(function() {
      if (exports.level[levelStr] <= this.level && args && args.length > 0) {
        var msg = args[0];

        if (args.length > 1) {
          msg = fmt.apply(null, args);
        }
        var timestamp = new Date();

        var loggers = this.loggers;
        Object.keys(loggers).forEach(function(loggerKey) {
          loggers[loggerKey].write(timestamp, levelStr, exports.level[levelStr], msg, stack);
        });
      };
    }.bind(this));
  },
  getLoggers:  function() {
    return this.loggers;
  },
  close: function() {
    this.loggers.forEach(function(logger) {
      logger.close();
    });
  },
  emergency: function() {
    this.log('EMERGENCY', arguments);
  },
  alert: function() {
    this.log('ALERT', arguments);
  },
  critical: function() {
    this.log('CRITICAL', arguments);
  },
  error: function() {
    this.log('ERROR', arguments);
  },
  warning: function() {
    this.log('WARNING', arguments);
  },
  notice: function() {
    this.log('NOTICE', arguments);
  },
  info: function() {
    this.log('INFO', arguments);
  },
  debug: function() {
    this.log('DEBUG', arguments);
  }
};
