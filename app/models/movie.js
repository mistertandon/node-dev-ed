var MongoDb_MM = require('./mongodbm'),
  MongoDbI_MM = MongoDb_MM.MongoDbI;

var MongoDb_L = require('./../locale/mongodb_locale').MongoDB_Locale;

/**
 * This module is used to retrieving documents using `collection.findOne`
 * method. In this case we will use single field as filter.
 */
exports.findWithOneField = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500).send(JSON.stringify({ 'error': MongoDb_L.CollectionCouldNotAccess }));
    }

    collection.findOne({ rated: 'G' }, { limit: 1 }, function (err, result) {

      if (err !== null) {
        res.status(500).send(JSON.stringify({ 'error': MongoDb_L.DocumentsCouldNotAccess }));
      }

      res.send(result);
    });

  });
}