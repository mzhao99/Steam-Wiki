// @desc Get all games
// @route /games
const getAll = (req, res) => {
    res.status(200).json({message: "All Games"});
};

// @desc Search Games
// @route /games/search
const search = (req, res) => {
    res.status(200).json({message: "Search Games"});
};

// @desc Lookup Game
// @route /games/:game_id
const lookup = (req, res) => {
    res.status(200).json({message: "Lookup game by id"});
}

module.exports = { getAll, search, lookup };