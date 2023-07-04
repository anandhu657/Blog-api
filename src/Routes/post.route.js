const express = require('express');
const router = express.Router();
const PostModel = require('../Model/post.model');
const errorResponder = require('../Middleware/error.middleware');
const authenticateToken = require('../Middleware/authentication');

router.post('/', authenticateToken, (req, res, next) => {

});

router.use(errorResponder);

module.exports = router;