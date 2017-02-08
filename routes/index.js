var express = require('express');

var mongoClient = require('mongodb').MongoClient;
const mongoDatabaseUrl = "mongodb://localhost:27017/worldbank";

var router = express.Router();

mongoClient.connect(mongoDatabaseUrl, function (err, db) {

  if (!err) {

    console.log('Connection has been made successfull using nodemon');
  }
  db.close();

});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    pageTitle: 'Express: Beginning with handlebars template',
    frameworksArr: ['Express Js', 'Koa Js', 'Hapi Js']
  });
});

module.exports = router;
