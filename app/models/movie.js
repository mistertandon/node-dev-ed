var MongoDb_MM = require('./mongodbm'),
  MongoDbI_MM = MongoDb_MM.MongoDbI;

var MongoDb_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDb_MC = require('./../config/mongodb_cong').MongoDB_CONF;


/**
 * This module is used to retrieving documents using `collection.findOne`
 * method. In this case we will use single field as filter.
 */
exports.findOneWithOneField = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500).send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.findOne({ rated: 'PG-13' }, { limit: MongoDb_MC.defaultFindLimitOptionValue }, function (err, result) {

      if (err !== null) {
        res.status(500).send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
      }

      res.send(result);
    });

  });
}

/**
 * This module is used to retrieving documents using `collection.findOne`
 * method. In this case we will use :
 *
 * single field for filtering
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithOneField = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500).send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find().limit(MongoDb_MC.defaultFindLimitOptionValue).toArray(function (err, documents) {

      if (err !== null) {
        res.status(500).send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
      }

      res.send(documents);
    });

  });
}