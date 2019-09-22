'use strict';

function MMError(code, msg) {
  return function MMError(error, message) {
    const err = new Error();
    err.code = code;
    err.message = msg;

    if (message) {
      err.message += '. ' + message;
    }

    if (error) {
      if (error.message) {
        err.message += ': ' + error.message;
      } else {
        err.data = error.data || error;
      }
    }

    return err;
  }
}

const errors = {
////general error to return from your methods
  Call: { code: 4000, message: 'Error' },

  //auth errors
  Unauthorized: { code: 4100, message: 'Unauthorized' },
  ProviderNotFound: { code: 4104, message: 'Auth provider not found' },
  Forbidden: { code: 4110, message: 'Forbidden' },
  NotValidToken: { code: 4120, message: 'Token vnot alid or expired' },

  //validation errors
  RequestValidation: { code: 4200, message: 'Request validation failed' },
  ResponseValidation: { code: 4210, message: 'Response validation failed' },
  RequestTooLarge: { code: 4220, message: 'Request entity too large' },
  RequestEncode: { code: 4230, message: 'Request encode error' },
  RequestDecode: { code: 4235, message: 'Request decode error' },
  ResponseEncode: { code: 4240, message: 'Response encode error' },
  ResponseDecode: { code: 4245, message: 'Response decode error' },
  UnsupportedMedia: { code: 4250, message: 'Unsupported media' },
  NoFilesInRequest: { code: 4255, message: 'No files found in the request' },

  //call errors
  MethodNotFound: { code: 4400, message: 'Method not found' },

  //response errors
  Duplicate: { code: 4500, message: 'Duplicate entity' },

  NotFound: { code: 4540, message: 'Not found' },

  //server errors
  ServerError: { code: 5000, message: 'Server error' },
  NetworkError: { code: 5100, message: 'Network error' }
}

const genericErrors = Object.entries(errors).reduce((exp, [ name, value ]) => {
  exp[name] = MMError(value.code, value.message);
  return exp;
}, {})

const errorCodes = Object.entries(errors).reduce((exp, [ name, value ]) => {
  exp[name] = value.code;
  return exp;
}, {})

module.exports = {
  Error: MMError,
  errorCodes,
  ...genericErrors
};

