var MongoDBI_ML = require("./../models/mongodbm").MongoDbI;
var MongoDB_LOCALE_ML = require("./../locale/mongodb_locale");

/**
 * `exports.inComparisionAggregationOperator` is used to  implement $in comparision aggregate operator.
 */
exports.inComparisionAggregationOperator = function (req, res, next) {

	MongoDBI_ML.collection('movies', { strict: true }, function (err, collection) {

		if (err !== null) {

			res
				.status(500)
				.send({ "err": MongoDB_LOCALE_ML.CollectionCouldNotAccess });
		}

		collection.aggregate(
			[
				{
					"$project": {

						"title": 1,
						"dayOfYear": { "$dayOfYear": "$released" },
						"runtimeGThen100": {
							"$gt": ["$runtime", 100]
						},
						"runtimeLThen100": {
							"$lt": ["$runtime", 100]
						},
						"isGrated": {
							"$eq": ["$rated", "G"]
						}
					}
				}
			], function (err, result) {

				if (err !== null) {

					res
						.status(500)
						.send({ "error": MongoDB_LOCALE_ML.DocumentsCouldNotAccess });
				}

				res
					.send(result);
			}
		);
	});
}