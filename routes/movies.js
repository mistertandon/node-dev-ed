'use strict';

var express = require('express');
var router = express.Router();

var Movie_MR = require('./../app/models/movie');
var MongodbQueryOperator_MR = require('./../app/lib/mongodb_query_operator');
var MongodbProjectionOperator_MR = require('./../app/lib/mongodb_projection_operator');
var MongodbAirthmaticAggregationOperator_MR = require('./../app/lib/mongodb_airthmatic_aggregation_operator');
var MongodbDateAggregationOperator_MR = require('./../app/lib/mongodb_date_aggregation_operator');
var MongodbGroupAccumulatorAggregationOperator_MR = require('./../app/lib/mongodb_group_accumulator_aggregation_operator');
var MongodbPipelineAggregation_MR = require('./../app/lib/mongodb_pipeline_aggregation');
var MongodbStringAggregationOperator_MR = require('./../app/lib/mongodb_string_aggregation_operator');
var ComparisionAggregationOperator_MR = require('./../app/lib/mongodb_comparision_aggregation_operator');

var UpdateString_MR = require('./../app/lib/update_string');
var UpdateArray_MR = require('./../app/lib/update_array');
var QueryOperatorArray_MR = require('./../app/lib/query_operator_array');

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
 */
router.get('/find/filter-with-one-field', function (req, res, next) {
  Movie_MR.findWithOneField(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use projection to reduce documents size by limiting fields in result
 */
router.get('/find/filter-with-one-field/projection-include-fields', function (req, res, next) {
  Movie_MR.findWithOneFieldProjectionIncludeFields(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use projection to reduce documents size by limiting fields in result
 * Will use projection to exclude desired fields from resultant documents
 */
router.get('/find/filter-with-one-field/projection-exclude-fields/limit/to-array', function (req, res, next) {
  Movie_MR.findWithOneFieldProjectionExcludeFields(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use projection to reduce documents size by limiting fields in result
 * Will use projection to eleminate `_id` field
 */
router.get('/find/projection-include-fields-exclude-id/limit/to-array', function (req, res, next) {
  Movie_MR.findWithOneFieldProjectionIncludedFieldExcludeId(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $lt, $gt comparision operator
 */
router.get('/find/lt-gt-comparision-operator/limit/to-array', function (req, res, next) {
  Movie_MR.findLtGtComparisionOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $lte, $gte comparision operator
 */
router.get('/find/lte-gte-comparision-operator/limit/to-array', function (req, res, next) {
  Movie_MR.findLteGteComparisionOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $ne comparision operator
 */
router.get('/find/ne-comparision-operator/limit/to-array', function (req, res, next) {
  Movie_MR.findNeComparisionOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $in, $nin comparision operator
 */
router.get('/find/in-nin-comparision-operator/limit/to-array', function (req, res, next) {
  Movie_MR.findWithOneFieldInNinComparisionOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $or, $and logical operator
 */
router.get('/find/or-and-logical-operator/limit/to-array', function (req, res, next) {
  Movie_MR.findWithOneFieldOrAndLogicalOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $not logical operator
 */
router.get('/find/not-logical-operator', function (req, res, next) {
  Movie_MR.notLogicalOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $exists element operator with `true` value
 */
router.get('/find/exists-true-element-operator', function (req, res, next) {
  Movie_MR.findExistsTrueElementOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $exists element operator with `true` value
 */
router.get('/find/exists-false-element-operator/limit/to-array', function (req, res, next) {
  Movie_MR.findExistsFalseElementOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $type element operator with `true` value
 */
router.get('/find/type-element-operator/limit/to-array', function (req, res, next) {
  Movie_MR.findTypeElementOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $all query operator
 */
router.get('/find/all-query-operator/limit/to-array', function (req, res, next) {
  MongodbQueryOperator_MR.findAllQueryOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $all query operator
 */
router.get('/find/elem-match-query-operator/limit/to-array', function (req, res, next) {
  MongodbQueryOperator_MR.findElemMatchQueryOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Will use $size query operator
 */
router.get('/find/size-query-operator/limit/to-array', function (req, res, next) {
  MongodbQueryOperator_MR.findSizeQueryOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * multiple fields for filtering
 */
router.get('/find/filter-with-multiple-fields/limit/to-array', function (req, res, next) {
  Movie_MR.findWithMultipleFields(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * single field for filtering (Nested Object field will use as filter)
 */
router.get('/find/filter-with-nested-object-field/limit/to-array', function (req, res, next) {
  Movie_MR.findWithNestedObjectField(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * An entire array for filtering documents
 */
router.get('/find/filter-with-entire-array-elements/limit/to-array', function (req, res, next) {
  Movie_MR.findWithEntireArrayElements(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use :
 * 
 * Any array key to match against provided value
 */
router.get('/find/filter-with-any-element-of-array/limit/to-array', function (req, res, next) {
  Movie_MR.findWithAnyElementOfArray(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use : Specific key of array to match against provided value
 */
router.get('/find/filter-with-specific-element-of-array/limit/to-array', function (req, res, next) {
  Movie_MR.findWithSpecificElementOfArray(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use : $elemMatch projection operator
 */
router.get('/find/elem-match-projection-operator', function (req, res, next) {
  MongodbProjectionOperator_MR.findElemMatchProjectionOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use : $ positional projection operator
 */
router.get('/find/positional-projection-operator', function (req, res, next) {
  MongodbProjectionOperator_MR.findPositionalProjectionOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use : $slice projection operator
 */
router.get('/find/slice-projection-operator', function (req, res, next) {
  MongodbProjectionOperator_MR.findSliceProjectionOperator(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use : $slice projection operator
 */
router.get('/find/add-airthmatic-operator', function (req, res, next) {
  MongodbAirthmaticAggregationOperator_MR.add(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use : $slice projection operator
 */
router.get('/find/ceil-airthmatic-operator', function (req, res, next) {
  MongodbAirthmaticAggregationOperator_MR.ceil(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use : $slice projection operator
 */
router.get('/find/date-aggregation-operator', function (req, res, next) {
  MongodbDateAggregationOperator_MR.dateAggregation(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use : $sum group accumulator
 */
router.get('/find/group-sum-accumulator-aggregation-operator', function (req, res, next) {
  MongodbGroupAccumulatorAggregationOperator_MR.sum(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `collection.find`
 * method. In this case we will use : $sum group accumulator
 */
router.get('/find/group-avg-accumulator-aggregation-operator', function (req, res, next) {
  MongodbGroupAccumulatorAggregationOperator_MR.avg(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `aggregate`
 */
router.get('/find/pipeline-aggregation-operator', function (req, res, next) {
  MongodbPipelineAggregation_MR.pipelineAggregation(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `aggregate`,
 * additionally implement $lookup and $unwind operator.
 */
router.get('/find/pipeline-lookup-aggregation-operator', function (req, res, next) {
  MongodbPipelineAggregation_MR.lookupAggregate(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `aggregate`,
 * additionally implement $redact operator.
 */
router.get('/find/pipeline-redact-aggregation-operator', function (req, res, next) {
  MongodbPipelineAggregation_MR.redactAggregate(req, res, next);
});

/**
 * This route definition handles request for demonstrating retrieving documents using `aggregate`,
 * additionally implement $aggregate `$in` comparision operator
 */
router.get('/find/comparision-aggregation-operator', function (req, res, next) {
  ComparisionAggregationOperator_MR.inComparisionAggregationOperator(req, res, next);
});


/**
 * This route definition handles request for demonstrating retrieving documents using `aggregate`
 * method. In this case we will use : $conact string operator
 */
router.get('/find/concat-string-aggregation-operator', function (req, res, next) {
  MongodbStringAggregationOperator_MR.stringAggregateOperators(req, res, next);
});

/**
 * This route definition handles request for updating single field.
 */
router.get('/update/update-one', function (req, res, next) {
  UpdateString_MR.updateOne(req, res, next);
});

/**
 * This route definition handles request for updating single field,
 * It uses $inc and $mul operator.
 */
router.get('/update/update-one-inc-mul-operator', function (req, res, next) {
  UpdateString_MR.updateOneIncMul(req, res, next);
});

/**
 * This route definition handles request for updating single field,
 * It uses $push operator.
 */
router.get('/update/update-array-push-operator', function (req, res, next) {
  UpdateArray_MR.updateArrayPush(req, res, next);
});

/**
 * This route definition handles request for updating single field,
 * It uses $push operator.
 */
router.get('/update/update-array-push-each-sort-slice-operator', function (req, res, next) {
  UpdateArray_MR.updateArrayPushEachSortSlice(req, res, next);
});

/**
 * This route definition handles find request.
 * It uses $all query operator array.
 */
router.get('/all-query-opeartor-array', function (req, res, next) {
  QueryOperatorArray_MR.allQueryOperatorArray(req, res, next);
});

/**
 * This route definition handles find request.
 * It uses $size query operator array.
 */
router.get('/size-query-opeartor-array', function (req, res, next) {
  QueryOperatorArray_MR.sizeQueryOperatorArray(req, res, next);
});

/**
 * This route definition handles find request.
 * It uses $elemMatch query operator array.
 */
router.get('/elem-match-query-opeartor-array', function (req, res, next) {
  QueryOperatorArray_MR.elemMatchQueryOperatorArray(req, res, next);
});

/**
 * This route definition handles find request.
 * It uses $elemMatch query operator array.
 */
router.get('/elem-match-with-all-query-opeartor-array', function (req, res, next) {
  QueryOperatorArray_MR.elemMatchWithAllQueryOperatorArray(req, res, next);
});



module.exports = router;