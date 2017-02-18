'use strict';

/**
 * `exports.add` module is used for calculator `add` operation.
 */
exports.add = function (req, res, next) {

	let add = parseInt(req.params.augend, 10) + parseInt(req.params.addend, 10);

	let result = {
		'sum': add
	};

	res.send(result);
}

/**
 * `exports.subtract` module is used for calculator `subtract` operation.
 */
exports.subtract = function (req, res, next) {

	let subtract = parseInt(req.params.minuend, 10) - parseInt(req.params.subtrahend, 10);

	let result = {
		'difference': subtract
	};

	res.send(result);
}

/**
 * `exports.multiply` module is used for calculator `multiplication` operation.
 */
exports.multiply = function (req, res, next) {

	let multiply = parseInt(req.params.multiplicand, 10) * parseInt(req.params.multiplier, 10);

	let result = {
		'product': multiply
	};

	res.send(result);
}