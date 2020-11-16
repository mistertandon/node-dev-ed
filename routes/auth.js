const router = require('express').Router();
const User = require('../model/User');

router.post('/register', async (req, res) => {


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