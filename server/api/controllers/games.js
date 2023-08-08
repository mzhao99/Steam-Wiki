const asyncHnadler = require('express-async-handler');

// @desc Get all games
// @route /games
const getAll = asyncHnadler(async (req, res) => {
    res.status(200).json({message: "All Games"});
});

// @desc Search Games
// @route /games/search
const search = asyncHnadler(async (req, res) => {
    res.status(200).json({message: "Search Games"});
});

// @desc Lookup Game
// @route /games/:game_id
const lookup = asyncHnadler(async (req, res) => {
    res.status(200).json({message: "Lookup game by id"});
});

module.exports = { getAll, search, lookup };