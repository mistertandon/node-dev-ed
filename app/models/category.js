var MongoDbI = require('./mongodbm').MongoDbI;

/*
var mongo = require('mongodb'),
  mongoServer = mongo.Server,
  mongoDB = mongo.Db;

var server, db;

server = new mongoServer('localhost', 27017);
db = new mongoDB('worldbank', server);

db.open(function (err, db) {

  if (err !== null) {

    console.log('Something went wrong with database, try after some time');
  }

});
*/
module.exports.getCategories = function (req, res, next) {

  /**
   * Using databse instance we will access categories table.
   */
  MongoDbI.collection('categories', function (err, collection) {

    if (err !== null) {
      next('Something wrong happend with collection while retrieving documents.');
    }

    /**
     * `collection` variable having access to categories collection,
     * using it we can retrieve all documents exist into it.
     * 
     */
    collection.find().toArray(function (err, categories) {

      if (err !== null) {
        next('Something wrong happend with documents while iterating over documents.');
      }

      res.send(categories);
    });
  });
}

