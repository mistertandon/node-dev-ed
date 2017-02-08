var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  next('Demonstrating error handler functionality.');
});

module.exports = router;