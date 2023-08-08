// Route handlers for /games endpoints
const express = require('express');
const router = express.Router();

// Get All Games
router.get('/', (req, res) => {
    res.status(200).json({message: "All Games"});
});

// Search Games
router.get('/search', (req, res) => {
    res.status(200).json({message: "Search Games"});
});

// Lookup Game
router.get('/:game_id', (req, res) => {
    res.status(200).json({message: "Lookup game by id"});
});

module.exports = router;