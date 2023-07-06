const jwt = require('jsonwebtoken');

// JWT TOKEN VERIFICATION
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    if (!token)
        res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err)
            res.sendStatus(403);
        res.locals = response;
        next();
    });
}

module.exports = authenticateToken;