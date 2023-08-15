const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Game = require('../../models/gameModel');

// @desc Get All
// @route /games
const getAll = asyncHandler(async (req, res, next) => {
    const games = await Game.find({});
    if(!games) {
        return next(new Error('No Games Found', 404));
    }
    res.status(200).json(games);
});

// @desc Get One
// @route /games/:game_id
const getOne = asyncHandler(async (req, res, next) => {
    const game = await Game.findById(req.params._id);
    if (!game){
        return next(new Error('Game Not Found', 404)); 
    }
    res.status(200).json(game);
});

// @desc Search games by title
// @route /games/search?title=..&genre=..
const search = asyncHandler(async (req, res, next) => {
    const query = {};
    const { name } = req.query;
    if (name){
        query.name = { $regex: name, $options: 'i' };    //$options: 'i' makes it case insensitive
    }
    // if(genre) {
    //     query.genre = genre;
    // }
    const games = await Game.find(query).sort({ createdAt: -1 });
    if (!games){
        return next(new Error('No Games Found', 404)); 
    }    
    res.status(200).json(games);
});

module.exports = { getAll, search, getOne };