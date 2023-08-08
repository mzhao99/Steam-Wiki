// Route handlers for /users endpoints  
const express = require('express');
const router = express.Router();

// Create User
router.post('/', (req, res) => {
    res.status(200).json({message: "Add new user"});
});

// Get Favorites
router.get('/favorites', (req, res) => {
    res.status(200).json({message: "Get user favorite games"});
});

// Add Favorites
router.post('/favorites', (req, res) => {
    res.status(200).json({message: "Add user favorite games"});
});

// Remove Favorites
router.delete('/favorites/:game_id', (req, res) => {
    res.status(200).json({message: "Add user favorite games"});
});

module.exports = router;