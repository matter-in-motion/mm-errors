'use strict';
const errors = require('./errors');

function getError(error) {
  if (typeof error === 'string') {
    error = errors[error];
  }

  if (!error) {
    error = errors.Call;
  }

  return error;
}

function isEmpty(something) {
  if (
    something === undefined ||
    something === false ||
    something === '' ||
    (something !== null && typeof something === 'object' && !Object.keys(something).length)
  ) {
    return true;
  }

  return false;
}


function ifEmpty(error) {
  error = getError(error);

  return result => {
    if (isEmpty(result)) {
      throw error();
    }

    return result;
  }
}

function ifError(error) {
  error = getError(error);

  return err => {
    if (typeof err.code === 'number') {
      throw err;
    }

    throw error(err);
  }
}

function ifInstanceThen(cls, error) {
  error = getError(error);

  return err => {
    if (err instanceof cls) {
      throw error();
    }

    throw err;
  }
}

function ifCodeThen(code, error) {
  error = getError(error);

  return err => {
    if (err.code === code) {
      throw error();
    }

    throw err;
  }
}

module.exports = {
  ifEmpty,
  ifError,
  ifInstanceThen,
  ifCodeThen
}
