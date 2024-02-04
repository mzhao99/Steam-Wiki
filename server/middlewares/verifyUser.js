const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if (!token)     return next(error)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)    return next(error);
        req.user = user;
        next();
    });
}

module.exports = {verifyToken}