var MongoDb_ML = require('./../models/mongodbm'),
  MongoDbI_ML = MongoDb_ML.MongoDbI;

var MongoDb_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDb_ML = require('./../config/mongodb_cong').MongoDB_CONF;

/**
 * This function is used to implement $all query operator.
 */
exports.add = function (req, res, next) {

  MongoDbI_ML.collection('orders', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.aggregate([
      {
        $project: {
          "OrderID": 1,
          "ShipVia": 1,
          "ShipTotal": {
            $add: ["$ShipVia", "$OrderID"]
          }
        }
      }], function (err, result) {
        res.send(result);
      });
  });
}

/**
 * This function is used to implement $ceil query operator.
 */
exports.ceil = function (req, res, next) {

  MongoDbI_ML.collection('orders', { 'strict': true }, function (err, collection) {

    if (err !== null) {
      res.status(500).send({ "error": MongoDb_ML.CollectionCouldNotAccess })
    }

    collection.aggregate([
      {
        $project: {
          "OrderID": 1,
          "ShipVia": 1,
          "FreightInt": {
            $ceil: "$Freight"
          }
        }
      }

    ], function (err, result) {

      if (err !== null) {
        res.status(500).send({ "error": MongoDb_ML.CeilAggregationOperationThrownError })
      }

      res.send(result);
    });
  });

}