const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../model/User');

const { userRegsiterValidation, userLoginValidation } = require('./../joi/signup.joi');

router.post('/register', async (req, res) => {

    try {

        const { error } = userRegsiterValidation(req.body);

        if (error) {

            let errorObj = {};

            error.details.forEach(({ message, context: { key } }) => errorObj[key] = message);

            throw new Error(JSON.stringify(errorObj));
        }

        const emailExist = await User.findOne({ email: req.body.email });

        if (emailExist !== null && typeof emailExist == 'object') {

            throw new Error('Email already exist');
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPwd = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPwd
        });

        const savedUser = await user.save();
        res.send({ id: savedUser._id });

    } catch (err) {

        res.status(404).send(err.message);
    }

});

router.post('/login', async (req, res) => {

    try {

        const { error } = userLoginValidation(req.body);

        if (error) {

            let errorObj = {};

            error.details.forEach(({ message, context: { key } }) => errorObj[key] = message);

            throw new Error(JSON.stringify(errorObj));
        }

        const userExist = await User.findOne({ email: req.body.email });

        if (userExist === null && typeof userExist === 'object') {

            throw new Error('Username or Email is not valid');
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, userExist.password);

        if (!isPasswordValid) {

            throw new Error('Password is invalid.');
        }

        res.send('Successful login');

    } catch (err) {

        res.status(404).send(err.message);
    }

});

module.exports = router;