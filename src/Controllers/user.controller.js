const UserModel = require('../Model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    /*
    NEW USER REGISTRATION
    CHECK IF THE USER IS ALREADY EXIST
    IF THE USER IS NOT EXIST IT WILL CREATE NEW ACCOUNT
    */
    userSignup: async (req, res, next) => {
        try {
            const userData = req.body;
            if (userData.email) {
                const userExist = await UserModel.findOne({ email: userData.email });
                if (!userExist) {
                    // PASSWORD HASHING
                    userData.password = await bcrypt.hash(userData.password, 10);
                    const newUser = await UserModel.create(userData);
                    res.status(200).json(newUser);
                } else {
                    const error = new Error("User already Exist");
                    error.statusCode = 409;
                    throw error;
                }
            } else {
                const error = new Error("Email is required");
                error.statusCode = 400
                throw error;
            }
        } catch (err) {
            next(err);
        }
    },


    /* 
    USER LOGIN
    CHECK IF THE USER IS VALID 
    IF THE USER IS VALID OR PRESENT IN THE DB
    COMPARE THE PASSWORD AND HASHED PASSWORD
    IF PASSWORD IS VALID IT WILL GENERATE A TOKEN AND SEND 
    */
    userSignin: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await UserModel.findOne({ email });
                if (user) {
                    const result = await bcrypt.compare(password, user.password); //PASSWORD COMPARE
                    if (result) {
                        const payload = {
                            id: user._id,
                            email: user.email,
                        }
                        //JWT TOKEN GENERATE
                        const access_token = jwt.sign(
                            payload,
                            process.env.ACCESS_TOKEN,
                            { expiresIn: '8h' }
                        );
                        res.status(200).json({ token: access_token });
                    }
                    else
                        throw new Error("Invalid password");
                }
                else
                    throw new Error("User not found");

            } else
                throw new Error("Email & password is required");
        } catch (err) {
            next(err);
        }
    }
}