## Matter In Motion. Error Codes

[![NPM Version](https://img.shields.io/npm/v/mm-errors.svg?style=flat-square)](https://www.npmjs.com/package/mm-errors)
[![NPM Downloads](https://img.shields.io/npm/dt/mm-errors.svg?style=flat-square)](https://www.npmjs.com/package/mm-errors)

Common errors for [Matter in Motion](http://https://github.com/matter-in-motion/mm) protocol

## Errors codes:

* **4000** Call — general error to return
* **4100** Unauthorized — unauthorized
* **4104** ProviderNotFound — Auth provider not found
* **4110** Forbidden — forbidden
* **4120** NotValidToken — token not valid or expired
* **4200** RequestValidation — request validation failed
* **4210** ResponseValidation — response validation failed
* **4220** RequestTooLarge — request entity too large
* **4230** RequestDecode — request decode error
* **4240** ResponseEncode — response encode error
* **4250** UnsupportedMedia — unsupported media
* **4400** MethodNotFound — method not found
* **4500** Duplicate — duplicate entity
* **4540** NotFound — not found
* **5000** ServerError — server error
* **5100** NetworkError — network error

## Usage
```js
const errors = require('mm-errors');
//when you need to return an error:
return errors.NotFound();
//or
throw errors.NotFound();
```

```js
return error.Call(data, message);
//or
throw error.Call(data, message);
```

You can add any data and/or message to errors;

## Custom errors
```js
const errors = require('mm-errors');
const CustomError = errors.Error(code, msg, toString);

//and then you can use it
return CustomError();
//or
throw CustomError();
```

* **code** — error code
* **message** — default message
* **toString** — optional toString function


License: MIT.
