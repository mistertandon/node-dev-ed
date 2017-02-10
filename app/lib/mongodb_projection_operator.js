var MongoDb_LM = require('./../models/mongodbm'),
  MongoDbI_LM = MongoDb_LM.MongoDbI;

var MongoDb_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDb_MC = require('./../config/mongodb_cong').MongoDB_CONF;

/**
 * This module is used to retrieve documents using `collection.find`
 * method. In this case we will use : $elemMatch projection operator
 */
exports.findElemMatchProjectionOperator = function (req, res, next) {

  MongoDbI_LM.collection('students', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find(
      {},
      {
        "students": {
          $elemMatch: {
            "age": { $lte: 10 }
          }
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
 * This module is used to retrieve documents using `collection.find`
 * method. In this case we will use : $ positional projection operator
 */
exports.findPositionalProjectionOperator = function (req, res, next) {

  MongoDbI_LM.collection('students', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({
      "students": {
        $elemMatch: {
          "age": {
            $lte: 10
          }
        }
      }
    }, {
        "students.$": 1
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
 * This module is used to retrieve documents using `collection.find`
 * method. In this case we will use : $slice projection operator
 * 
 * $slice: 5         :This operation returns the first five items in array.
 * $slice: -5         :This operation returns the last five items in array.
 * $slice: [ 20, 10 ] : the query will only return 10 items, after skipping the first 20 items of that array.
 * $slice: [ -20, 10 ]: This operation returns 10 items as well, beginning with the item that is 20th from the last item of the array.


 */
exports.findSliceProjectionOperator = function (req, res, next) {

  MongoDbI_LM.collection('students', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find(
      {},
      {
        "students": {
          $slice: 2
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
// findSliceProjectionOperator