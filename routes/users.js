'use strict'
var express = require('express');
var router = express.Router();

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
