// Entry point, starts Express app
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Create express app
const app = express();

// Connect to MongoDB

// Require routes.js
const routes = require('./api/routes'); 

// Use routes
app.use(routes);

// Start Server
app.listen(5000, () => {console.log("Server started on port 5000")});