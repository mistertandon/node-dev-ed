var MongoDb_ML = require('./../models/mongodbm'),
  MongoDbI_ML = MongoDb_ML.MongoDbI;

var MongoDb_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDb_ML = require('./../config/mongodb_cong').MongoDB_CONF;

/**
 * This function is used to implement $sum group accumulator operator.
 */
exports.sum = function (req, res, next) {

  MongoDbI_ML.collection('orders', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.aggregate([
      {
        "$group": {
          "_id": "$EmployeeID",
          "EmployeeShipCost": {
            $sum: "$ShipVia"
          },
          "count": { $sum: 1 }
        }
      }], function (err, result) {
        res.send(result);
      });
  });
}

/**
 * This function is used to implement $avg group accumulator operator.
 */
exports.avg = function (req, res, next) {

  MongoDbI_ML.collection('orders', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.aggregate([
      {
        "$group": {
          "_id": "$EmployeeID",
          "EmployeeShipCost": {
            $avg: "$ShipVia"
          },
          "count": { $sum: 1 }
        }
      }], function (err, result) {
        res.send(result);
      });
  });
}