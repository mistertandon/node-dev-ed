const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../model/User');

const { userRegsiterSchema } = require('./../joi/signup.joi');

router.post('/register', async (req, res) => {

    try {

        const { error } = userRegsiterSchema(req.body);

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
        res.send(savedUser);

    } catch (err) {

        res.status(404).send(err.message);
    }

});

module.exports = router;