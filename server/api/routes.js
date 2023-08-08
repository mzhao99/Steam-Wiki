// Endpoint route definitions
const express = require('express');
const router = express.Router();

// Import controllers
const { getAll, search, lookup } = require('./controllers/games');
const { createUser, getFavorites, addToFavorites, removeFavorite } = require('./controllers/users');
const { loginAuth } = require('./controllers/login');

// Game routes 
router.get('/games', getAll);
router.get('/games/search', search);
router.get('/games/:game_id', lookup);

// User routes
router.post('/users', createUser);
router.route('/users/favorites').get(getFavorites).post(addToFavorites);
router.delete('users/favorites/:game_id', removeFavorite);

// Login routes
router.get('/login', loginAuth);

module.exports = router;