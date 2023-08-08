// Entry point, starts Express app
const express = require('express');
const dotenv = require('dotenv').config({path: '../.env'});
const connectDB = require('./config/db');

// Create express app
const app = express();

// Connect to MongoDB
connectDB();

// Require routes.js
const routes = require('./api/routes'); 

// Use routes
app.use(routes);

// Start Server
app.listen(5000, () => {console.log("Server started on port 5000")});