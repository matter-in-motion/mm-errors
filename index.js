'use strict';
const util = require('./util');

module.exports = require('./errors');
module.exports.ifEmpty = util.ifEmpty;
module.exports.ifError = util.ifError;
module.exports.ifInstanceThen = util.ifInstanceThen;
module.exports.ifCodeThen = util.ifCodeThen;
