const express = require('express');
const router = express.Router();
const errorResponder = require('../Middleware/error.middleware'); //ERROR HANDLING MIDDLEWARE
const userController = require('../Controllers/user.controller');

// USER ROUTES
router.post('/register', userController.userSignup);
router.post('/login', userController.userSignin);

router.use(errorResponder); //MIDDLEWARE FOR HANDLING ERRORS

module.exports = router;