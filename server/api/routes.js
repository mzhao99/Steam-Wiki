// Endpoint route definitions
const express = require('express');
const router = express.Router();

// Import controllers
const { getAll, search, getOne } = require('./controllers/gameController');
const { updateUser, deleteUser, getFavorites, addToFavorites, removeFavorite } = require('./controllers/userController');
const { signUp, signIn, google, signOut } = require('./controllers/authController')
const { verifyToken } = require('../middlewares/verifyUser')

// Game routes 
router.get('/games', getAll);
router.get('/search', search);
router.get('/games/:gameId', getOne);

// User routes
router.post('/user/update/:id', verifyToken, updateUser)
router.delete('/user/delete/:id', verifyToken, deleteUser)
router.route('/user/favorites').get(getFavorites).post(addToFavorites);
router.delete('/user/favorites/:game_id', removeFavorite);

// Auth routes
router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.get('/signOut', signOut)

// Google auth route
router.post('/google', google)

module.exports = router;