'use strict';

var express = require('express');
var router = express.Router();
var Calculator_MR = require('./../app/models/calculator.js');

/**
 * Route to handle Calculator `add` opeartion.
 */
router.get('/add/:augend/:addend', function (req, res, next) {

    Calculator_MR.add(req, res, next);
});

/**
 * Route to handle Calculator `subtract` opeartion.
 */
router.get('/subtract/:minuend/:subtrahend', function (req, res, next) {

    Calculator_MR.subtract(req, res, next);
});

module.exports = router;
