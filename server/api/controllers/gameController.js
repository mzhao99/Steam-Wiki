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

        // if (type === 'sale_recent') {
        //     queryFilters.discount_rate = { $gt: 0 };
        
        //     const oneMonthAgo = new Date();
        //     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        //     const oneMonthAgoFormatted = oneMonthAgo.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
        //     queryFilters.release_date = { $gte: oneMonthAgoFormatted };
        // }

        // // Sale: discount rate > 0
        if (type === 'sale')    queryFilters.discount_rate = { $gt: 0 };
    
        // Recently Released: released in the past 3 months
        // if (type === 'recent') {
        //     const threeMonthsAgo = new Date();
        //     threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        //     const threeMonthsAgoFormatted = threeMonthsAgo.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
        //     queryFilters.release_date = { $gte: threeMonthsAgoFormatted };
        // }
    
        const sortBy = (function() {
            switch (sort) {
                case 'createat':
                    return 'release_date';
                case 'price':
                    return 'final_price';
                default:
                    return sort;
            }
        })();

        // const pipeline = [
        //     { $match: queryFilters },
        //     {
        //         $addFields: {
        //           splitDate: { $split: ["$release_date", ", "] }
        //         }
        //       },
        //     {
        //         $addFields: {
        //             // Further split the first part of the date to isolate month and day
        //             monthDay: { $split: [{ $arrayElemAt: ["$splitDate", 0] }, " "] },
        //             year: { $arrayElemAt: ["$splitDate", 1] } // Second part is the year
        //         }
        //     },
        //     {
        //         $addFields: {
        //             month: { $arrayElemAt: ["$monthDay", 0] }, // Month is the first element
        //             day: { $arrayElemAt: ["$monthDay", 1] }, // Day is the second element
        //             monthNum: {
        //                 $switch: {
        //                     branches: [
        //                         { case: { $eq: ["$month", "Jan"] }, then: "01" },
        //                         { case: { $eq: ["$month", "Feb"] }, then: "02" },
        //                         { case: { $eq: ["$month", "Mar"] }, then: "03" },
        //                         { case: { $eq: ["$month", "Apr"] }, then: "04" },
        //                         { case: { $eq: ["$month", "May"] }, then: "05" },
        //                         { case: { $eq: ["$month", "Jun"] }, then: "06" },
        //                         { case: { $eq: ["$month", "Jul"] }, then: "07" },
        //                         { case: { $eq: ["$month", "Aug"] }, then: "08" },
        //                         { case: { $eq: ["$month", "Sep"] }, then: "09" },
        //                         { case: { $eq: ["$month", "Oct"] }, then: "10" },
        //                         { case: { $eq: ["$month", "Nov"] }, then: "11" },
        //                         { case: { $eq: ["$month", "Dec"] }, then: "12" },
        //                     ],
        //                     default: "01" 
        //                 }
        //             }
        //         }
        //     },
        //     // Add a field 'convertedReleaseDate' by converting 'release_date' from string to date
        //     { $addFields: {
        //         convertedReleaseDate: { 
        //           $dateFromString: { 
        //             dateString: { $concat: ["$year", "-", "$monthNum", "-", "$day"] },
        //             format: "%Y-%m-%d"
        //           } 
        //         }
        //     }},
        //     { $skip: startIndex },
        //     { $limit: limit }
        // ];

        // // Add sorting to the pipeline if sorting by 'createat'
        // if (sort === 'createat') {
        //     const sortOrder = order === 'desc' ? -1 : 1;
        //     pipeline.push({ $sort: { convertedReleaseDate: sortOrder } });
        // }

        // const games = await Game.aggregate(pipeline).catch(next);

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