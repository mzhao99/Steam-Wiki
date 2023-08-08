// @desc Create User
// @route /users
const createUser = (req, res) => {
    res.status(200).json({message: "Add new user"});
};

// @desc Get Favorites
// @route /users/favorites
const getFavorites = (req, res) => {
    res.status(200).json({message: "Get user favorite games"});
};

// @desc Add Favorites
// @route /users/favorites
const addToFavorites = (req, res) => {
    res.status(200).json({message: "Add user favorite games"});
};

// @desc Remove Favorites
// @route /users/favorites/:game_id
const removeFavorite = (req, res) => {
    res.status(200).json({message: "Remove user favorite games"});
};

module.exports = { createUser, getFavorites, addToFavorites, removeFavorite };