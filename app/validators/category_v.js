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