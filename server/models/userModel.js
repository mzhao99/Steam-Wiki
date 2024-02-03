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
        unique: true,
        require: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
}, {timestamps: true });

// Find a user either by email or username
userSchema.statics.findByLogin = async (login_credential) => {
    // First look for a user by username
    let user = await this.findOne({ 
        username: login_credential,
    });
    // If not found, look for a user by email
    if (!user) {
        user = await this.findOne({ email: login_credential });
    }
    return user;
};

// Defines a pre 'remove' hook that handles cleaning up when a user is removed
// userSchema.pre('remove', function(next) {
//     this.model('Game').updateMany(
//       { userFavorites: this._id },
//       { $pull: { userFavorites: this._id } }
//     );
//     next();
// });

module.exports = mongoose.model('User', userSchema);