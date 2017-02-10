var MongoDb_ML = require('./../models/mongodbm'),
  MongoDbI_ML = MongoDb_ML.MongoDbI;

var MongoDb_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDb_ML = require('./../config/mongodb_cong').MongoDB_CONF;

/**
 * This function is used to implement string aggregate operator.
 */
exports.stringAggregateOperators = function (req, res, next) {

  MongoDbI_ML.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.aggregate([
      {
        "$project": {
          "title": { "$toUpper": "$title" },
          "released_DayOfYear": { "$dayOfYear": "$released" },
          "plot": { "$substr": ["$plot", 0, 20] },
          "isWriterAlsoHero": { "$strcasecmp": ["$title", "$director"] }
        }
      }], function (err, result) {
        res.send(result);
      });
  });
}