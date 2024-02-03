const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({ 
        success: false,
        statusCode: statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
}

module.exports = { errorHandler };