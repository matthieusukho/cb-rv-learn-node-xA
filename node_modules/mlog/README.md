mlog
====

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Downloads][downloads-image]][npm-url]



## Installation

via npm:

    $ npm install mlog

## Log Providers

1. Console
2. Mongo
3. Null


## Configuration

With default provider configuration:

```javascript
var logConfiguration = {
    level: 'INFO',
    loggers: {
        'console': true
    }
}
```

To override default provider configuration:

```javascript
var logConfiguration = {
    level: INFO,
    loggers: {
      mongodb: {
        db: 'logdatabase',
        host: 'loghost'
      }
    }
}
```

With multiple providers:
```javascript
var logConfiguration = {
    level: 'INFO',
    loggers: {
        mongodb: true,
        'console': true
    }
}
```


## Full Example

```javascript
var logger = require('mlog');

var logConfiguration = {
  level: 'INFO',
  loggers: {
    'console': true
  }
};

var log = new logger(logConfiguration);

log.info('Test info log');
log.error('Test error log with stack trace');
```

## Notes

Log levels
```javascript
EMERGENCY: 0
ALERT: 1
CRITICAL: 2
ERROR: 3
WARNING: 4
NOTICE: 5
INFO: 6
DEBUG: 7
```

For `ERROR` and below:
* if no instance of Error is logged, then the logger will get the current stack trace
* if an instance of Error is logged, the stack trace from the respective Error is used
* if multiple instances of Error are logged, the stack trace from the first Error is used


```javascript
var logger = require('mlog');

var logConfiguration = {
  level: 'INFO',
  loggers: {
    'console': true
  }
};

var log = new logger(logConfiguration);

//no instance of Error passed, the logger attempts to capture the stack trace
log.error('Test info log', 'Second message', 'Third message');

//one instance of Error passed, the logger uses it for the stack trace
var error1 = new Error('bad error 1');
log.error('Test error log with stack trace', error1);

//multiple instances of Error passed, the logger uses the first one for the stack trace
var error2 = new Error('bad error 2');
var error3 = new Error('bad error 3');
log.error('Test error log with stack trace', error2, error3);
```


## License

```
The MIT License (MIT)

Copyright (c) 2014 Stefan Negrea

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```



[npm-url]: https://npmjs.org/package/mlog
[npm-image]: http://img.shields.io/npm/v/mlog.svg
[downloads-image]: http://img.shields.io/npm/dm/mlog.svg

[travis-url]: https://travis-ci.org/atnstefan/mlog
[travis-image]: https://travis-ci.org/atnstefan/mlog.svg
