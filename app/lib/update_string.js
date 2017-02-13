var MongoDb_ML = require('./../models/mongodbm'),
	MongoDbI_ML = MongoDb_ML.MongoDbI;

var MongoDb_LMsg_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDb_ML = require('./../config/mongodb_cong').MongoDB_CONF;

/**
 * This function is used to update document.
 */
exports.updateOne = function (req, res, next) {

	MongoDbI_ML.collection('movies', { 'strict': true }, function (err, collection) {

		collection.update(
			{
				title: {
					$eq: "Toy Story 3"
				}
			},
			{
				$set: {
					title: "Toy Story 4"
				}
			},
			function (err, result) {

				if (err !== null) {
					res.status(500).send({ "error": MongoDb_LMsg_ML.CollectionCouldNotAccess })
				}

				res.send(result);
			});

	});

}

/**
 * This route definition handles request for updating single field,
 * It uses $inc and $mul operator.
 */
exports.updateOneIncMul = function (req, res, next) {

	MongoDbI_ML.collection('movies', { 'strict': true }, function (err, collection) {

		collection.update(
			{
				title: {
					$eq: "Toy Story 4"
				}
			},
			{
				$inc: { year: 1 },
				$mul: { runtime: 2 }
			},
			function (err, result) {

				if (err !== null) {
					res.status(500).send({ "error": MongoDb_LMsg_ML.CollectionCouldNotAccess })
				}

				res.send(result);
			});
	});
}