var MongoDb_MM = require('./../models/mongodbm'),
  MongoDbI_MM = MongoDb_MM.MongoDbI;

var MongoDb_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDb_MC = require('./../config/mongodb_cong').MongoDB_CONF;

/**
 * This function is used to implement $all query operator.
 */
exports.findAllQueryOperator = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({
      "actors": {
        $all: ["Ryan Reynolds", "Morena Baccarin", "Ed Skrein"]
      }
    })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}

/**
 * This function is used to implement $elemMatch query operator.
 */

exports.findElemMatchQueryOperator = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({
      "actors": {
        $elemMatch: { $eq: "Ed Skrein" }
      }
    })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}

/**
 * This function is used to implement $size query operator.
 */

exports.findSizeQueryOperator = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({
      "actors": {
        $size: 4
      }
    })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}
