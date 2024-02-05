const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Game = require('../../models/gameModel');

// @desc Get all games
// @route /all-games
// const getAll = asyncHandler(async (req, res, next) => {
//     const games = await Game.find({});
//     if(!games || games.length === 0) {
//         return next(new Error('No Games Found', 404));
//     }
//     res.status(200).json(games);
// });

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
// @route /search?name=..&genre=..
const search = asyncHandler(async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const { type, genres, platforms, categories, searchTerm, sort, order } = req.query;
        const queryFilters = {};

        if (searchTerm)   queryFilters.name = { $regex: searchTerm, $options: 'i' };
        if (platforms)    queryFilters.platforms = { $in: platforms };
        // Ensure 'genres' is treated as an array and map the corresponding name as in the database
        let genresArray = [];
        if (Array.isArray(req.query.genres)) {
            genresArray = req.query.genres;
        } else if (typeof req.query.genres === 'string') {
            genresArray = [req.query.genres];
        }
        if (genres) {
            const mappedGenres = genresArray.map(genre => {
                switch (genre) {
                    case 'indie':
                        return 'Indie';
                    case 'strategy':
                        return 'Strategy'; 
                    case 'action':
                        return 'Action'; 
                    case 'adventure':
                        return 'Adventure'; 
                    case 'rpg':
                        return 'RPG'; 
                    default:
                        return genre; 
                }
            });
            queryFilters.genres = { $in: mappedGenres };
        }
        // Ensure 'categories' is treated as an array and map the corresponding name as in the database
        let categoriesArray = [];
        if (Array.isArray(req.query.categories)) {
            categoriesArray = req.query.categories;
        } else if (typeof req.query.categories === 'string') {
            categoriesArray = [req.query.categories];
        }
        if (categories) {
            const mappedCategories = categoriesArray.map(category => {
                switch (category) {
                    case 'single':
                        return 'Single-player';
                    case 'multi':
                        return 'Multi-player'; 
                    default:
                        return category; 
                }
            });
            queryFilters.categories = { $in: mappedCategories };
        }

        // On Sale and recently released
        if (type === 'sale_recent') {
            queryFilters.discount_rate = { $gt: 0 };
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            queryFilters.newReleaseDate = { $gte: sixMonthsAgo };
        }

        // Sale: discount rate > 0
        if (type === 'sale')    queryFilters.discount_rate = { $gt: 0 };
    
        // Recently Released: released in the past month
        if (type === 'recent') {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            queryFilters.newReleaseDate = { $gte: oneMonthAgo };
        }
    
        const sortBy = (function() {
            switch (sort) {
                case 'createdAt':
                    return 'newReleaseDate';
                case 'price':
                    return 'final_price';
                default:
                    return sort;
            }
        })();

        const games = await Game.find(queryFilters)
                                .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
                                .limit(limit)
                                .skip(startIndex)
                                .catch(next);
        res.status(200).json(games);
      } catch (error) {
        next(error);
      }
});

module.exports = { search, getOne };