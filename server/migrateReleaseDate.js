const dotenv = require('dotenv').config({path: '../.env'});

// MongoDB connection string from your .env file
const dbURI = process.env.MONGODB_URI;

// Connect to MongoDB
const { connectDB, closeDB } = require('./config/db');
connectDB();

const Game = require('./models/gameModel'); 

const convertReleaseDate = async () => {
    const games = await Game.find({}); 
    for (let game of games) {
        // Skip games that already have a valid newReleaseDate
        if (game.newReleaseDate) {
            console.log(`Skipping game ${game._id}, ${game.name} as it already has a valid new release date.`);
            continue;
        }

        let newReleaseDate = null;
        // Check if release_date is not empty
        if (game.release_date && game.release_date.trim() !== '' && game.release_date.includes(',')) {
            try {
                const [monthDay, year] = game.release_date.split(', ');
                const [month, day] = monthDay.split(' ');
                newReleaseDate = new Date(`${month} ${day}, ${year}`);
            } catch(error) {
                // If parsing failed, set newReleaseDate to null
                newReleaseDate = null;
            }
        }
        await Game.updateOne({ _id: game._id }, { $set: { newReleaseDate: newReleaseDate } });
        console.log(`Updated game ${ game._id }, ${ game.name } with new release date.`);
    }
    console.log('All games have been updated with the new release date field.');
    closeDB()
};

// Execute the conversion function
convertReleaseDate();