'use strict';

const _isEmpty_V = require('lodash').isEmpty;
var isAlphNumeric_V = require('./validations_lib').isAlphaNumeric;
var isAlphaNumericWithUndHyp_V = require('./validations_lib').isAlphaNumericWithUndHyp;

/**
 * Importing isValid functin of bson-objectid module.
 */
var objectIDValidate = require('bson-objectid').isValid;

exports.validateObjectID = function (req, res, next) {

  var documentId = req.params.id;
  /**
   * Validating provided `_id`
   */
  if (!objectIDValidate(documentId)) {

    res.send({ 'error': 'ObjectID is invalid.' });
  }

}

/**
 * This module is used to validate add categroy request.
 */
exports.validateAddCategoryRequestV = function (req, res, next) {

  var categoryObj = {};
  var errorObj = {};

  var CategoryID = Number.parseInt(req.body.CategoryID, 10);
  var CategoryName = req.body.CategoryName;
  var Description = req.body.Description;
  var field4 = req.body.field4;
  var field5 = req.body.field5;
  var field6 = req.body.field6;
  var field7 = req.body.field7;

  /**
   * Now we will accumulate all errors messages if found.
   */

  if (!Number.isFinite(CategoryID)) {
    errorObj.CategoryID = "Passed category id must be a finite integer.";
  }

  if (!isAlphNumeric_V(CategoryName)) {
    errorObj.CategoryName = "Category name must contained alph-numeric characters.";
  }

  if (!isAlphaNumericWithUndHyp_V(Description)) {
    errorObj.Description = "Category description contains invalid charaters.";
  }

  if (!isAlphNumeric_V(field4)) {
    errorObj.field4 = "field4 must contained alph-numeric characters.";
  }

  if (!isAlphNumeric_V(field5)) {
    errorObj.field5 = "field5 must contained alph-numeric characters.";
  }

  if (!isAlphNumeric_V(field6)) {
    errorObj.field6 = "field4 must contained alph-numeric characters.";
  }

  if (!isAlphNumeric_V(field7)) {
    errorObj.field7 = "field4 must contained alph-numeric characters.";
  }

  if (!_isEmpty_V(errorObj)) {
    res.send(JSON.stringify(errorObj));
  }

  /**
   * `categoryObj` we'll directly use this object for add category action.
   */
  categoryObj = {
    'CategoryID': CategoryID,
    'CategoryName': CategoryName,
    'Description': Description,
    'field4': field4,
    'field5': field5,
    'field6': field6,
    'field7': field7
  };

  return categoryObj;
}











