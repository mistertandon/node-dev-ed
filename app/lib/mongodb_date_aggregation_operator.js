var MongoDb_ML = require('./../models/mongodbm'),
  MongoDbI_ML = MongoDb_ML.MongoDbI;

var MongoDb_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDb_ML = require('./../config/mongodb_cong').MongoDB_CONF;

/**
 * This function is used to implement $all query operator.
 */
exports.dateAggregation = function (req, res, next) {

  MongoDbI_ML.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.aggregate([
      {
        $project: {
          "title": 1,
          "runtime": 1,
          "rated": 1,
          "MovieReleased_DayOfYear": { $dayOfYear: "$released" },
          "MovieReleased_DayOfMonth": { $dayOfMonth: "$released" },
          "MovieReleased_DayOfWeek": { $dayOfWeek: "$released" },
          "MovieReleased_Year": { $year: "$released" },
          "MovieReleased_Month": { $month: "$released" },
          "MovieReleased_Week": { $week: "$released" },
          "MovieReleased_hour": { $hour: "$released" },
          "MovieReleased_Minute": { $minute: "$released" },
          "MovieReleased_Second": { $second: "$released" }
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