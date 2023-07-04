const errorResponder = (error, req, res, next) => {
    const status = error.statusCode || 400
    res.status(status).json({ message: error.message });
}

module.exports = errorResponder;