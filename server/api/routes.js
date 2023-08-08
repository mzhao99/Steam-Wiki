// Endpoint route definitions
const express = require('express');
const router = express.Router();

// Import controllers
const gamesController = require('./controllers/games');
const usersController = require('./controllers/users');
const loginController = require('./controllers/login');

// Game routes 
// router.get('/games/search', gamesController.search);
router.use('/games', gamesController);
router.use('/users/:user_id', usersController);
router.use('/login', loginController);

module.exports = router;