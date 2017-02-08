var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    pageTitle: 'Express: Beginning with handlebars template',
    frameworksArr: ['Express Js', 'Koa Js', 'Hapi Js']
  });
});

module.exports = router;
