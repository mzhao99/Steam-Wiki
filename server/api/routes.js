// Endpoint route definitions
const express = require('express');
const router = express.Router();

// Import controllers
const { getAll, search, getOne } = require('./controllers/gameController');
const { createUser, getFavorites, addToFavorites, removeFavorite } = require('./controllers/userController');
const { loginAuth } = require('./controllers/loginController');

// Game routes 
router.get('/games', getAll);
router.get('/games/search', search);
router.get('/games/:game_id', getOne);

// User routes
router.post('/users', createUser);
router.route('/users/favorites').get(getFavorites).post(addToFavorites);
router.delete('/users/favorites/:game_id', removeFavorite);

// Login routes
router.get('/login', loginAuth);

module.exports = router;