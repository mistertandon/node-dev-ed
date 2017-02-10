'use strict';

var express = require('express');
var router = express.Router();

var Movie_MR = require('./../app/models/movie');

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.findOne`
 * method. In this case we will use single field as filter.
 */
router.get('/findWithOneField', function (req, res, next) {
  Movie_MR.findWithOneField(req, res, next);
});

module.exports = router;

