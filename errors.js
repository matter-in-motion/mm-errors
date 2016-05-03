'use strict';

let mmError = function(code, msg, toString) {
  return function(data, message) {
    let err = new Error();
    err.code = code;
    err.message = msg;

    if (message) {
      err.message += '. ' + message;
    }

    if (data) {
      err.data = data;
    }

    if (toString) {
      err.toString = toString;
    }

    return err;
  }
}

//generic error
const Call                  = mmError(4000, 'Error'); //general error to return from your methods

//auth errors
const Unauthorized          = mmError(4100, 'Unauthorized');
const ProviderNotFound      = mmError(4104, 'Auth provider not found');
const Forbidden             = mmError(4110, 'Forbidden');
const NotValidToken         = mmError(4120, 'Token not valid or expired');

//validation errors
const RequestValidation     = mmError(4200, 'Request validation failed');
const ResponseValidation    = mmError(4210, 'Response validation failed');
const RequestTooLarge       = mmError(4220, 'Request entity too large');
const RequestDecode         = mmError(4230, 'Request decode error');
const ResponseEncode        = mmError(4240, 'Response encode error');
const UnsupportedMedia      = mmError(4250, 'Unsupported media');

//call errors
const MethodNotFound        = mmError(4400, 'Method not found');
const ChannelNotFound       = mmError(4410, 'Channel not found');
const SubscriptionNotFound  = mmError(4420, 'Subscription not found');

//response errors
const Duplicate             = mmError(4500, 'Duplicate entity');
const NotFound              = mmError(4540, 'Not found');

//server errors
const ServerError           = mmError(5000, 'Server error');

module.exports = {
  Error: mmError,
  Call,
  Unauthorized,
  ProviderNotFound,
  Forbidden,
  NotValidToken,
  RequestValidation,
  ResponseValidation,
  RequestTooLarge,
  RequestDecode,
  ResponseEncode,
  UnsupportedMedia,
  MethodNotFound,
  ChannelNotFound,
  SubscriptionNotFound,

  Duplicate,
  NotFound,

  ServerError
};

