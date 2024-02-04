const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../../models/userModel');
const bcryptjs = require('bcryptjs');

// @desc Update user info
// @route /user/update/:id
const updateUser = asyncHandler(async (req, res, next) => {
    if (req.user.id !== req.params.id)      return next(new Error('Unauthorized access'));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { 
                new: true 
            }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
})

const deleteUser = asyncHandler(async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(new Error('You can only delete your own account!'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
})

// @desc Get Favorites
// @route /user/favorites
const getFavorites = asyncHandler(async (req, res) => {
    const user_id = req.body.username;
    try {
        const user = await User.findById(user_id).populate('favorites');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const favorites = user.favorites;
        res.status(200).json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'}); 
    }
});

// @desc Add Favorites
// @route /user/favorites
const addToFavorites = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Add user favorite games"});
});

// @desc Remove Favorites
// @route /user/favorites/:game_id
const removeFavorite = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Remove user favorite games"});
});

module.exports = { updateUser, deleteUser, getFavorites, addToFavorites, removeFavorite };