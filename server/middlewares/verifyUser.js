import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookie.access_token

    if (!token)     return next(error)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)    return next(error);
        req.user = user;
        next();
    });
}