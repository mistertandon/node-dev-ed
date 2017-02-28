var mongo = require('mongodb'),
  mongoServer = mongo.Server,
  mongoDB = mongo.Db;

var server, db;

/**
 * We will create server instance.
 */
server = new mongoServer("127.0.0.1", 27017);

/**
 * We are craeting databse instance hosted on above mentiobed server.
 */
db = new mongoDB('worldbank', server);

/**
 * Before exporting Db variable, we will ensure that mongod is capable to
 * open provided database.
 */
db.open(function (err, db) {

  if (err !== null) {

    console.log('Something went wrong with database, try after some time');
  }

});

exports.MongoDbI = db;