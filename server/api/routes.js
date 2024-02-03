// Endpoint route definitions
const express = require('express');
const router = express.Router();

// Import controllers
const { getAll, search, getOne } = require('./controllers/gameController');
const { updateUser, getFavorites, addToFavorites, removeFavorite } = require('./controllers/userController');
const { signUp, signIn, google } = require('./controllers/authController')

// Game routes 
router.get('/games', getAll);
router.get('/games/search', search);
router.get('/games/:_id', getOne);

// User routes
router.post('/update/:id', updateUser)
router.route('/user/favorites').get(getFavorites).post(addToFavorites);
router.delete('/user/favorites/:game_id', removeFavorite);

// Auth routes
router.post('/signUp', signUp)
router.post('/signIn', signIn)

// Google auth route
router.post('/google', google)

module.exports = router;