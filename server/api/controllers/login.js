// Route handlers for /login endpoints  
const express = require('express');
const router = express.Router();

// User Authentication
router.get('/', (req, res) => {
    res.status(200).json({message: "Login successful"});
});

module.exports = router;