// Endpoint route definitions
const express = require('express');
const router = express.Router();

// Import controllers
const { getAll, search, getOne } = require('./controllers/gameController');
const { getFavorites, addToFavorites, removeFavorite } = require('./controllers/userController');
const { loginAuth } = require('./controllers/loginController');
const { signUp } = require('./controllers/authController')

// Game routes 
router.get('/games', getAll);
router.get('/games/search', search);
router.get('/games/:_id', getOne);

// User routes
router.route('/users/favorites').get(getFavorites).post(addToFavorites);
router.delete('/users/favorites/:game_id', removeFavorite);

// Login routes
router.get('/login', loginAuth);

// Auth routes
router.post('/signUp', signUp)

module.exports = router;