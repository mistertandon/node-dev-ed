var MongoDb_ML = require('./../models/mongodbm'),
	MongoDbI_ML = MongoDb_ML.MongoDbI;

var MongoDb_LMsg_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDB_CONF_ML = require('./../config/mongodb_cong').MongoDB_CONF;

/**
 *	This route definition handles find request, using $all query operator array.
 */
exports.allQueryOperatorArray = function (req, res, next) {

	MongoDbI_ML.collection('movies', { strict: true }, function (error, collection) {

		if (error != null) {

			res
				.status(500)
				.send({ "error": MongoDb_LMsg_ML.CollectionCouldNotAccess });
		}

		collection
			.find({
				"actors": {
					$all: [/^Tom Hanks$/i, /^Tim Allen$/i]
				}
			})
			.toArray(function (err, documents) {

				if (error != null) {

					res
						.status(500)
						.send({ "error": MongoDb_LMsg_ML.DocumentsCouldNotAccess });
				}

				res.send(documents);
			});
	});

}

/**
 *	This route definition handles find request, using $size query operator array.
 */
exports.sizeQueryOperatorArray = function (req, res, next) {

	MongoDbI_ML.collection('movies', { strict: true }, function (error, collection) {

		if (error != null) {

			res
				.status(500)
				.send({ "error": MongoDb_LMsg_ML.CollectionCouldNotAccess });
		}

		collection
			.find({
				"actors": {
					$size: 4
				}
			})
			.toArray(function (err, documents) {

				if (error != null) {

					res
						.status(500)
						.send({ "error": MongoDb_LMsg_ML.DocumentsCouldNotAccess });
				}

				res.send(documents);
			});
	});

}

/**
 *	This route definition handles find request, using $size query operator array.
 */
exports.elemMatchQueryOperatorArray = function (req, res, next) {

	MongoDbI_ML.collection('movies', { strict: true }, function (error, collection) {

		if (error != null) {

			res
				.status(500)
				.send({ "error": MongoDb_LMsg_ML.CollectionCouldNotAccess });
		}

		collection
			.find({
				"actors": {
					$elemMatch: { $eq: "Tom Hanks" }
				}
			})
			.toArray(function (err, documents) {

				if (error != null) {

					res
						.status(500)
						.send({ "error": MongoDb_LMsg_ML.DocumentsCouldNotAccess });
				}

				res.send(documents);
			});
	});
}

/**
 *	This route definition handles find request, using $all and $elemMatch query operator array.
 */
exports.elemMatchWithAllQueryOperatorArray = function (req, res, next) {

	MongoDbI_ML.collection('movies', { strict: true }, function (error, collection) {

		if (error != null) {

			res
				.status(500)
				.send({ "error": MongoDb_LMsg_ML.CollectionCouldNotAccess });
		}

		collection
			.find({
				"reviews": {
					$all: [
						{
							$elemMatch: {
								"name": { $eq: "parvesh" }, "rating": { $eq: 8.9 }
							}
						}
					]
				}
			})
			.toArray(function (err, result) {

				if (err != null) {

					res
						.status(500)
						.send({ "error": MongoDb_LMsg_ML.DocumentsCouldNotAccess });
				}

				res
					.send(result);

			});

	});
}


// db.getCollection('movies').update(

// 	{
// 		"reviews": {
// 								$elemMatch: { "name": { $eq: "parvesh" }, "rating": { $eq: 8.9 } }
// 		}
// 	},
// 	{
// 		$currentDate: {
// 										"reviews.$.date": true
// 		}
// 	}

// )
