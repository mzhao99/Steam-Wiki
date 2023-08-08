// Database connection
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (mongoose.connection.readyState === 1) {
            console.log('Connected!');
        }
    }catch(error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;