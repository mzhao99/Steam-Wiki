const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const User = require('../../models/userModel');
const { errorHandler } = require('../../middlewares/errorMiddleware');
const jwt = require('jsonwebtoken');

// @desc Create User
// @route /signUp
const signUp = asyncHandler(async(req, res, next) => {
    const body = req.body;
    try {
        const user = await User.create({
            username: body.username,
            password: bcryptjs.hashSync(body.password, 10),
            email: body.email,
            favorites: body.favorites,
        });
        res.status(200).json("User created successfully");
    } catch(error) {
        next(error);
    }
});

// @desc User Sign in
// @route /signin
const signIn = asyncHandler(async(req, res, next) => {
    const body = req.body;
    try {
        // check if email exists
        const validUser = await User.findOne({ email: body.email });
        if (!validUser){
            return next(errorHandler(404, 'User not found'))
        } 
        
        // check password
        const validPassword = bcryptjs.compareSync(body.password, validUser.password);
        if (!validPassword){
            return next(errorHandler(401, 'Email and password does not match'))
        }

        // login
        const token = jwt.sign({ id: validUser._id },  process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc      // separate password from the rest so that it does not gets send back to the user
        res.cookie('access_token', token, { 
            httpOnly: true, 
            // expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })
        .status(200)
        .json(rest)     // rest of the data except for the password
    } catch(error) {
        next(error);
    }
})

const google = asyncHandler(async(req, res, next) => {
    const body = req.body;
    try {
        // check if user exists or not
        const user = await User.findOne({email: body.email})
        if (user) {     // user exists
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest} = user._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        } else {    // register new user
            // create a random password
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = await User.create({
                email: body.email,
                username: body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                password: hashedPassword,
                avatar: body.photo
            })

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest} = newUser._doc
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = { signUp, signIn, google }