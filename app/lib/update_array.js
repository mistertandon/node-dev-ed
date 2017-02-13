var MongoDb_ML = require('./../models/mongodbm'),
	MongoDbI_ML = MongoDb_ML.MongoDbI;

var MongoDb_LMsg_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDB_CONF_ML = require('./../config/mongodb_cong').MongoDB_CONF;

/**
 * This function is used to update array element of document .
 */
exports.updateArrayPush = function (req, res, next) {

	MongoDbI_ML.collection('movies', { 'strict': true }, function (err, collection) {

		collection.update(
			{
				"title": {
					$eq: "Toy Story 4"
				}
			},
			{
				$push: {
					"reviews": {
						"date": new Date("2017-02-13T04:00:00.000Z"),
						"name": "parvesh",
						"rating": 8.9,
						"comment": "My first review for Toy Story 3, hoping it will execute while trying for the very first time."
					}
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
 * This function is used to update array element of document, it uses
 * $push, $each, $slice, $sort opeartor.
 */
exports.updateArrayPushEachSortSlice = function (req, res, next) {

	MongoDbI_ML.collection('movies', { 'strict': true }, function (err, collection) {

		collection.update(
			{
				"title": {
					$eq: "Toy Story 4"
				}
			},
			{
				$push: {
					"reviews": {
						$each: [{
							"date": new Date("2017-02-13T04:00:00.000Z"),
							"name": "Prabhash",
							"rating": 8.9,
							"comment": "My first review for Toy Story 3, hoping it will execute while trying for the very first time."
						},
						{
							"date": new Date("2017-02-11T04:00:00.000Z"),
							"name": "praveen",
							"rating": 6.7,
							"comment": "My first review for Toy Story 3, hoping it will execute while trying for the very first time."
						}, {
							"date": new Date("2017-02-03T04:00:00.000Z"),
							"name": "payal",
							"rating": 5.9,
							"comment": "My first review for Toy Story 3, hoping it will execute while trying for the very first time."
						}],
						$sort: { "rating": -1 },
						$slice: 3
					}
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
