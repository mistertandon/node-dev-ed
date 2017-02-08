var express = require('express');
var util = require('util');
var router = express.Router();

router.post('/add', function (req, res, next) {

  req.checkBody('email', 'Enter E-mail Address').notEmpty();
  req.checkBody('email', 'Enter valid E-mail Address').isEmail();

  req.getValidationResult().then(function (result) {

    if (!result.isEmpty()) {

      res.status(500).send('Validation errors stack :' + util.inspect(result.array()));

      return;
    }

  });


});

module.exports = router;