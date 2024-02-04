const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Game = require('../../models/gameModel');

// @desc Get All
// @route /games
const getAll = asyncHandler(async (req, res, next) => {
    const games = await Game.find({});
    if(!games || games.length === 0) {
        return next(new Error('No Games Found', 404));
    }
    res.status(200).json(games);
});

// @desc Get One
// @route /games/:gameId
const getOne = asyncHandler(async (req, res, next) => {
    const game = await Game.findById(req.params.gameId);
    if (!game){
        return next(new Error('Game Not Found', 404)); 
    }
    res.status(200).json(game);
});

// @desc Search games by title
// @route /games/search?title=..&genre=..
const search = asyncHandler(async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const { type, tag, platforms, searchTerm, sort = 'createdAt', order = 'desc' } = req.query;
        const queryFilters = {};
        if (tag)    queryFilters.genres = { $in: tag.split(",") };
        if (platforms)    queryFilters.platforms = { $in: platforms.split(",") };
        if (searchTerm)   queryFilters.name = { $regex: searchTerm, $options: 'i' };
    
        if (type === 'sale_and_recent') {
            queryFilters.discount_rate = { $gt: 0 };
        
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            const oneMonthAgoFormatted = oneMonthAgo.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
            queryFilters.release_date = { $gte: oneMonthAgoFormatted };
        }

        // Sale: discount rate > 0
        if (type === 'sale') queryFilters.discount_rate = { $gt: 0 };
    
        // Recently Released: released in the past month
        if (type === 'recent') {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            const oneMonthAgoFormatted = oneMonthAgo.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
          
            queryFilters.release_date = { $gte: oneMonthAgoFormatted };
        }
    
        const games = await Game.find(queryFilters)
                                .sort({ [sort]: order === 'desc' ? -1 : 1 })
                                .limit(limit)
                                .skip(startIndex)
                                .catch(next);
        res.status(200).json(games);
      } catch (error) {
        next(error);
      }
});


module.exports = { getAll, search, getOne };