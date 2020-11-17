const jwt = require('jsonwebtoken');

function verifyJwt(req, res, next) {

    const token = req.header('auth-token');

    if (!token) return res.status(401).send('Invalid headers');

    try {

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = verified;
        next();

    } catch (err) {

        res.status(404).send('Invalid token.')
    }

}

module.exports.verifyJwt = verifyJwt;