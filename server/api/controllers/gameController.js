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

// @desc Search Games by name
// @route /games/search
const search = asyncHandler(async (req, res) => {
    const query = {};
    if(req.query.name) {
        query.name = { $regex: req.query.name, $options: 'i' };  //$options: 'i' makes it case insensitive
    }
    // if(req.query.genre) {
    //     query.genre = req.query.genre;
    // }
    const games = await Game.find(query).sort({ createdAt: -1 });
    res.status(200).json(games);
});


// const addGame = asyncHandler(async (req, res) => {
    // const body = req.body;
    // const game = await Game.create({
    //     game_id: body.game_id,
    //     name: body.name,
    //     type: body.type,
    //     final_price: body.final_price,
    //     initial_price: body.initial_price,
    //     discount_rate: body.discount_rate,
    //     release_date: body.release_date,
    //     genres: body.genres,
    //     platforms: body.platforms,
    //     categories: body.categories,
    //     image_url: body.image_url
    // });
    // res.status(200).json(game);
// })

module.exports = { getAll, search, getOne };