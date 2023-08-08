const asyncHnadler = require('express-async-handler');
const Game = require('../../models/gameModel');

// @desc Get All
// @route /games
const getAll = asyncHnadler(async (req, res) => {
    const games = await Game.find({});
    res.status(200).json(games);
});

// @desc Get One
// @route /games/:game_id
const getOne = asyncHnadler(async (req, res) => {
    const game = await Game.findById(req.params.game_id);
    res.status(200).json(game);
});

// @desc Search Games
// @route /games/search
const search = asyncHnadler(async (req, res) => {
    const query = {};
    if(req.query.name) {
        query.name = { $regex: req.query.name, $options: 'i' };
    }
    if(req.query.genre) {
        query.genre = req.query.genre;
    }
    const games = await Game.find(query).sort({ createdAt: -1 });
    res.status(200).json(games);
});

module.exports = { getAll, search, getOne };