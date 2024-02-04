// Entry point, starts Express app
const express = require('express');
const dotenv = require('dotenv').config({path: '../.env'});
const cookieParser = require('cookie-parser');

// Create express app
const app = express();

// Parse JSON bodies
app.use(express.json()); 

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Request data from API and store in DB
const { loadGames } = require('./api/controllers/setupController');
// loadGames('us');

// Require routes.js
const routes = require('./api/routes'); 

// Use routes
app.use(cookieParser())
app.use(routes);
// app.use('/api/user', userRouter)

// Use error handler
const { errorHandler } = require('./middlewares/errorMiddleware');
app.use(errorHandler);

// Start Server
app.listen(5000, () => {console.log("Server started on port 5000")});