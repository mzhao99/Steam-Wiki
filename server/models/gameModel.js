// Game model definition
const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    current_price: {
        type: Number,
        require: true
    },
    sale_price: Number,
    normal_price: Number,
    release_date: {
        type: String,
        require: true
    },
    genres: [String],
    platform: [String]
});

module.exports = mongoose.model('Game', gameSchema);