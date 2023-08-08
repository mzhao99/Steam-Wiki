const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Game = require('../../models/gameModel');

// @desc Get All
// @route /games
const getAll = asyncHandler(async (req, res) => {
    const games = await Game.find({});
    res.status(200).json(games);
});

// @desc Get One
// @route /games/:game_id
const getOne = asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.game_id);
    res.status(200).json(game);
});

// @desc Search Games
// @route /games/search
const search = asyncHandler(async (req, res) => {
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

const addGame = asyncHandler(async (req, res) => {
    const game = await Game.create({
        game_id: req.body.game_id,
        name: req.body.name,
        final_price: req.body.final_price,
        initial_price: req.body.initial_price,
        discount_rate: req.body.discount_rate,
        release_date: req.body.release_date,
        genres: req.body.genres,
        platforms: req.body.platform,
        categories: req.body.categories,
        image_url: req.body.image_url
    });
    res.status(200).json(game);
})

const deleteGame = asyncHandler(async (req, res) => {
    await Game.findByIdAndDelete(req.params.id);
    res.status(200).json(req.params.game_id);
});


module.exports = { getAll, search, getOne, addGame, deleteGame };