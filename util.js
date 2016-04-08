'use strict';
const errors = require('./errors');

let isEmpty = function(something) {
  if (something === undefined || something === '' || (something !== null && typeof something === 'object' && !Object.keys(something).length)) {
    return true;
  }

  return false;
};


let handler = function(error, cb) {
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
    } else if (isEmpty(result)) {
      cb(error());
    } else {
      cb(null, result);
    }
  };
}

let resHandler = function(error, cb) {
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

  return function(result) {
    if (isEmpty(result) && error) {
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
