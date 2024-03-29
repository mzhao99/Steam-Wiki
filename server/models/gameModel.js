// Game model definition
const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    game_id: {
        type: Number,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    final_price: Number,
    initial_price: Number,
    discount_rate: Number,
    release_date: String,
    genres: [String],
    platforms: [String],
    categories: [String],
    image_url: String,
    newReleaseDate: Date
});

module.exports = mongoose.model('Game', gameSchema, 'games_us');