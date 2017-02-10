var MongoDbM = require('./mongodbm'),
  MongoDbI = MongoDbM.MongoDbI;

var objectID = require('bson-objectid');

module.exports.getCategories = function (req, res, next) {
  /**
   * Using databse instance we will access categories table.
   */
  MongoDbI.collection('categories', { 'strict': true }, function (err, collection) {

    if (err !== null) {
      next('Something wrong happend with collection while retrieving documents.');
    }

    /**
     * `collection` variable having access to categories collection,
     * using it we can retrieve all documents exist into it.
     * 
     */
    collection.find().toArray(function (err, categories) {

      if (err !== null) {
        res.send({ 'error': 'Something wrong happend with documents while iterating over documents.' });
      }

      res.send(categories);
    });
  });
}

/**
 * This function is used to find category corresponding to provided `_id`.
 */
module.exports.findCategory = function (req, res, next) {

  var documentId = req.params.id;
  /**
   * Getting access to categories collection.
   */
  MongoDbI.collection('categories', { 'strict': true }, function (err, collection) {

    /**
     * Retrieve document corresponding to provided _id.
     */
    collection.find({ '_id': objectID(documentId) }).toArray(function (arr, document) {

      if (err !== null) {
        res.send({ 'error': err.message });
      }

      res.send(document);
    });
  });
}

/**
 * `deleteCategory` module is used to delete document corresponding to specified
 * `_id`.
 */
exports.deleteCategory = function (req, res, next) {

  var documentID = req.params.id;

  MongoDbI.collection('categories', { 'strict': true }, function (err, collection) {

    collection.deleteOne({ '_id': objectID(documentID) }, function (err, deleteResult) {

      if (err !== null) {
        res.status(500).send('Something went wrong while while performing delete action. Try after some time.');
      }

      res.send('Document with _id ' + documentID + ' has been deleted successfully.');
    });

  });
}

/**
 * `deleteCategory` module is used to delete document corresponding to specified
 * `_id`.
 */
exports.addCategory = function (req, res, next, categoryObj) {

  MongoDbI.collection('categories', { 'strict': true }, function (err, collection) {

    collection.insertOne(categoryObj, {}, function (err, result) {

      if (err !== null) {
        res.send({ 'error': 'Something went wrong while inserting document, please try after some time.' });
      }

      res.send({ 'success': 'Category document has been added successfully, document id is :' + result.insertedId });
    });

  });
}




