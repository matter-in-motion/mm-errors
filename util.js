'use strict';
const errors = require('./errors');

let isEmpty = function(something) {
  if (!something) {
    return true;
  }
  return typeof something === 'object' && !Object.keys(something).length;
};


let handler = function(error, ret, cb) {
  if (typeof ret === 'function') {
    cb = ret;
    ret = undefined;
  }

  if (typeof error === 'function') {
    cb = error;
    error = undefined;
  }

  if (typeof error === 'string') {
    error = errors[error];
  }

  if (!error) {
    error = errors.Call;
  }

  return function(err, result) {
    if (err) {
      if (err.code) {
        cb(err);
      } else {
        cb(error(err));
      }
    } else if (ret !== undefined) {
      let retType = typeof ret;
      if (retType === 'string' || retType === 'number') {
        cb(null, result[ret]);
      } else {
        cb(null, result);
      }
    } else if (isEmpty(result) && error) {
      cb(error());
    } else {
      cb(null, result);
    }
  };
}

let resHandler = function(error, ret, cb) {
  if (typeof error === 'string') {
    error = errors[error];
  }

  if (typeof ret === 'function') {
    cb = ret;
    ret = undefined;
  }

  return function(result) {
    if (ret !== undefined) {
      let retType = typeof ret;
      if (retType === 'string' || retType === 'number') {
        cb(null, result[ret]);
      } else {
        cb(null, result);
      }
    } else if (isEmpty(result) && error) {
      cb(error());
    } else {
      cb(null, result);
    }
  };
}

let errHandler = function(error, cb) {
  if (!cb) {
    cb = error;
    error = undefined;
  } else if (typeof error === 'string') {
    error = errors[error];
  }

  if (!error) {
    error = errors.Call;
  }

  return function(err) {
    cb(error(err));
  };
}

module.exports = {
  handler,
  result: resHandler,
  error: errHandler
};
