// Route handlers for /login endpoints  

// @desc User Authentication
// @route /login
const loginAuth = (req, res) => {
    res.status(200).json({message: "Login successful"});
};

module.exports = { loginAuth };