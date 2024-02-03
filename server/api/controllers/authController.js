const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const User = require('../../models/userModel');

// @desc Create User
// @route /signUp
const signUp = asyncHandler(async(req, res, next) => {
    const body = req.body;
    try {
        const user = await User.create({
            username: body.username,
            password: bcryptjs.hashSync(body.password, 10),
            email: body.email,
            favorites: body.favorites
        });
        res.status(200).json("User created successfully");
    } catch(error) {
        next(error);
    }
});

module.exports = { signUp }