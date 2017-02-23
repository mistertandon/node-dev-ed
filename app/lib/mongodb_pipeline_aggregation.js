var MongoDb_ML = require('./../models/mongodbm'),
  MongoDbI_ML = MongoDb_ML.MongoDbI;

var MongoDb_MLocale_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;

/**
 * This function is used to implement $all query operator.
 */
exports.pipelineAggregation = function (req, res, next) {

  MongoDbI_ML.collection('products', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_MLocale_ML.CollectionCouldNotAccess });
    }

    collection.aggregate([

      {
        "$match": {
          "CategoryID": { $lte: 5 }
        }
      },

      {
        "$project": {
          "ProductID": 1,
          "ProductName": 1,
          "SupplierID": 1,
          "CategoryID": 1,
          "QuantityPerUnit": 1,
          "UnitPrice": 1,
          "UnitsInStock": 1,
          "UnitsOnOrder": 1,
          "ReorderLevel": 1,
          "StockTotalAmount": { $multiply: ["$UnitPrice", "$UnitsInStock"] }
        }
      },
      {
        "$group": {
          "_id": "$CategoryID",
          "CategroyWiseStockAmount": { $sum: "$UnitPrice" },
          "CategoryWiseProductCount": { $sum: 1 }
        }
      },
      {
        "$skip": 1
      },
      {
        "$limit": 3
      },
      {
        "$sort": { "CategoryWiseProductCount": 1 }
      }
    ], function (err, result) {
      res.send(result);
    });
  });
}

/**
 * `exports.lookupaggregate` demonstrate `$lookup` opeartor
 */
exports.lookupAggregate = function (req, res, next) {

  MongoDbI_ML.collection('employees', { 'strict': true }, function (err, collection) {

    if (err !== null) {

      res.status(500)
        .send({ 'error': MongoDb_MLocale_ML.CollectionCouldNotAccess });
    }

    collection.aggregate(
      [
        {
          "$lookup": {
            from: "employee-territories",
            localField: "EmployeeID",
            foreignField: "EmployeeID",
            as: "employee_territory"
          }
        },
        {
          $unwind: "$employee_territory"
        }
      ], function (err, aggregationResult) {

        if (err !== null) {

          res.status(500)
            .send({ 'error': MongoDb_MLocale_ML.DocumentsCouldNotAccess });
        }

        res.send(aggregationResult);

      });
  });
}

exports.redactAggregate = function (req, res, next) {

  MongoDbI_ML.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {

      res.status(500)
        .send({ 'error': MongoDb_MLocale_ML.CollectionCouldNotAccess });
    }

    /**
     * If condition samples:
     */
    collection.aggregate(
      [
        {
          "$redact": {
            "$cond": {
              if: true,
              then: "$$DESCEND",
              else: "$$PRUNE"
            }
          }
        }
      ], function (err, result) {

        if (err !== null) {

          res.status(500)
            .send({ 'error': MongoDb_MLocale_ML.DocumentsCouldNotAccess });
        }

        res.send(result);
      }
    );
  })
}