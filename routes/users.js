'use strict'
var express = require('express');
var router = express.Router();

var mongoClient = require('mongodb').MongoClient;
const mongoDatabaseUrl = "mongodb://localhost:27017/worldbank";

mongoClient.connect(mongoDatabaseUrl, function (err, db) {

    /**
     * Here we are checking an err variable is having null value
     * or not.
     * 
     */
    if (err === null && typeof err === "object") {

        console.log('Connection has been made successfull using nodemon');
    }
    db.close();

});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('user index page.');
    //    res.render('users/index', {title: 'User master Index page', usersArr: ['Parvesh Tandon', 'Payal Tandon']});
});

router.get('/profile', function (req, res, next) {

    let firstName = req.query.first_name;
    let lastName = req.query.last_name;

    let UserInfo = {
        firstName: firstName,
        lastName: lastName
    }
    res.render('users/profile', UserInfo);
});

/* GET users edit webpage. */
router.get('/:id', function (req, res, next) {

    res.render('users/edit', { userInfo: { id: req.params.id } });
});

module.exports = router;