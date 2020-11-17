const router = require('express').Router();
const User = require('../model/User');
const { userRegsiterSchema } = require('./../joi/signup.joi');

router.post('/register', async (req, res) => {

    const { error } = userRegsiterSchema(req.body);

    if (error) {

        let errorObj = {};

        error.details.forEach(({ message, context: { key } }) => errorObj[key] = message);

        return res.status(400).send(errorObj);

    }

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        const savedUser = await user.save();
        res.send(savedUser);

    } catch (err) {

        res.status(404).send(err);
    }

});

module.exports = router;