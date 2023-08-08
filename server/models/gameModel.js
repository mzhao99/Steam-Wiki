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
    final_price: {
        type: Number,
        require: true
    },
    initial_price: Number,
    discount_rate: Number,
    release_date: {
        type: String,
        require: true
    },
    genres: [String],
    platforms: [String],
    categories: [String],
    image_url: String
});

module.exports = mongoose.model('Game', gameSchema);