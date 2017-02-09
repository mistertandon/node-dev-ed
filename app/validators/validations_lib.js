exports.isAlphaNumeric = function (inputVal) {

  return /^([A-Za-z0-9]+\s*)+$/.test(inputVal);

}

/**
 * This function is used to validate string against alphanumeric charaters,
 * also allowing `-`, `_` charaters.
 */
exports.isAlphaNumericWithUndHyp = function (inputVal) {

  return /^([A-Za-z0-9\,\.]+\s*)+$/.test(inputVal);

}