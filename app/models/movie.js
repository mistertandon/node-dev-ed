var MongoDb_MM = require('./mongodbm'),
  MongoDbI_MM = MongoDb_MM.MongoDbI;

var MongoDb_ML = require('./../locale/mongodb_locale').MongoDb_MLocale;
var MongoDb_MC = require('./../config/mongodb_cong').MongoDB_CONF;


/**
 * This module is used to retrieving documents using `collection.findOne`
 * method. In this case we will use single field as filter.
 */
exports.findOneWithOneField = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500).send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.findOne({ rated: 'PG-13' }, { limit: MongoDb_MC.defaultFindLimitOptionValue }, function (err, result) {

      if (err !== null) {
        res.status(500).send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
      }

      res.send(result);
    });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * single field for filtering
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithOneField = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500).send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ rated: 'PG-13' }).limit(MongoDb_MC.defaultFindLimitOptionValue).toArray(function (err, documents) {

      if (err !== null) {
        res.status(500).send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
      }

      res.send(documents);
    });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * multiple fields for filtering
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithMultipleFields = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500).send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ 'rated': 'PG-13', 'year': 2016 }).limit(MongoDb_MC.defaultFindLimitOptionValue).toArray(function (err, documents) {

      if (err !== null) {
        res.status(500).send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
      }

      res.send(documents);
    });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * single field for filtering (Nested Object field will use as filter)
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithNestedObjectField = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500).send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "tomato.meter": 99 }).limit(MongoDb_MC.defaultFindLimitOptionValue).toArray(function (err, documents) {

      if (err !== null) {
        res.status(500).send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
      }

      res.send(documents);
    });

  });
}

/**
 * This module is used to retrieving documents using `collection.findOne`
 * method. In this case we will use :
 *
 * An entire array for filtering documents
 * limit method of find cursor
 * toArray method of find curosr
 * 
 * Note: Array ordering matter in find method. In below example collection.find retrieve documents
 * having writer key an array with two elements [ "Rhett Reese" followed by "Paul Wernick" ]
 */
exports.findWithEntireArrayElements = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {


    if (err !== null) {
      res.status(500).send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "writers": ["Rhett Reese", "Paul Wernick"] }).limit(MongoDb_MC.defaultFindLimitOptionValue).toArray(function (err, documents) {

      if (err !== null) {
        res.status(500).send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
      }

      res.send(documents);
    });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * Any array key to match against provided value
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithAnyElementOfArray = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {


    if (err !== null) {
      res.status(500).send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "writers": "Andrew Stanton" }).limit(MongoDb_MC.defaultFindLimitOptionValue).toArray(function (err, documents) {

      if (err !== null) {
        res.status(500).send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
      }

      res.send(documents);
    });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * Specific array key to match against provided value
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithSpecificElementOfArray = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "writers.0": "John Lasseter" })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500).send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * Will use projection to reduce documents size by limiting fields in result
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithOneFieldProjectionIncludeFields = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "writers": "John Lasseter" }, { "title": 1, "year": 1 })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * Will use projection to reduce documents size by limiting fields in result
 * Will use projection to eliminate `_id` field
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithOneFieldProjectionIncludedFieldExcludeId = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "writers": "John Lasseter" }, { "title": 1, "year": 1, "_id": 0 })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * Will use projection to reduce documents size by limiting fields in result
 * Will use projection to eliminate `_id` field
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithOneFieldProjectionExcludeFields = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "writers": "John Lasseter" }, { "writers": 0, "actors": 0, "plot": 0, "poster": 0, "imdb": 0, "tomato": 0 })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * Will use $lt, $gt comparision operator
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithOneFieldLtGtComparisionOperator = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "runtime": { $lt: 140, $gt: 105 } })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * Will use $lte, $gte comparision operator
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithOneFieldLteGteComparisionOperator = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "runtime": { $lte: 140, $gte: 105 } })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * Will use $ne comparision operator
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithOneFieldNeComparisionOperator = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "year": { $ne: 2016 } })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}

/**
 * This module is used to retrieving documents using `collection.find`
 * method. In this case we will use :
 *
 * Will use $in, $nin comparision operator
 * limit method of find cursor
 * toArray method of find curosr
 */
exports.findWithOneFieldInNinComparisionOperator = function (req, res, next) {

  MongoDbI_MM.collection('movies', { strict: true }, function (err, collection) {

    if (err !== null) {
      res.status(500)
        .send({ 'error': MongoDb_ML.CollectionCouldNotAccess });
    }

    collection.find({ "year": { $in: [2010, 2012], $nin: [2016] } })
      .limit(MongoDb_MC.defaultFindLimitOptionValue)
      .toArray(function (err, documents) {

        if (err !== null) {
          res.status(500)
            .send({ 'error': MongoDb_ML.DocumentsCouldNotAccess });
        }

        res.send(documents);
      });

  });
}