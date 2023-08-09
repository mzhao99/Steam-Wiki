const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../../models/userModel');

// @desc Create User
// @route /users
const createUser = asyncHandler(async (req, res) => {
    const body = req.body;
    const user = await User.create({
        username: body.username,
        password: body.password,
        email: body.email,
        favorites: body.favorites
    });
    res.status(200).json(user);
});

// @desc Get Favorites
// @route /users/favorites
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
// @route /users/favorites
const addToFavorites = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Add user favorite games"});
});

// @desc Remove Favorites
// @route /users/favorites/:game_id
const removeFavorite = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Remove user favorite games"});
});

module.exports = { createUser, getFavorites, addToFavorites, removeFavorite };