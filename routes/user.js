const router = require('express').Router();

const { verifyJwt } = require('./../token/verifyJwt');

router.get('/profile', verifyJwt, (req, res) => {

    console.log('/profile');
    res.json({ title: 'secret' });

});

module.exports = router;