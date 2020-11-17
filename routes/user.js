const router = require('express').Router();
const User = require('./../model/User');

const { verifyJwt } = require('./../token/verifyJwt');

router.get('/profile', verifyJwt, (req, res) => {

    const id = req.user._id;

    User.findById(id, (err, userRecord) => {

        if (err) {

            res.status(401).send('Unknown user');
        } else {

            res.send(JSON.stringify(userRecord));
        }

    });
});

module.exports = router;