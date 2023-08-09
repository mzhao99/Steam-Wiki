// User model definition
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }]
});

module.exports = mongoose.model('User', userSchema);