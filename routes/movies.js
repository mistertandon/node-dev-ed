'use strict';

var express = require('express');
var router = express.Router();

var Movie_MR = require('./../app/models/movie');

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.findOne`
 * method. In this case we will use single field as filter.
 */
router.get('/find-one/filter-with-one-field', function (req, res, next) {
  Movie_MR.findOneWithOneField(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * single field for filtering
 * limit method of find cursor
 * toArray method of find curosr
 */
router.get('/find/filter-with-one-field/limit/to-array', function (req, res, next) {
  Movie_MR.findWithOneField(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * multiple fields for filtering
 * limit method of find cursor
 * toArray method of find curosr
 */
router.get('/find/filter-with-multiple-fields/limit/to-array', function (req, res, next) {
  Movie_MR.findWithMultipleFields(req, res, next);
});

module.exports = router;

